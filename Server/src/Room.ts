import {generateUUID} from './utils/utils'
import {GameState, GameStatus} from './GameState'
import * as ws from 'ws';

export type Players = Record<string, Iplayer>

interface IRoom  {
  gameState: GameState,
  players: Players,
}

export interface Iplayer {
  connection: ws,
  gameStatus: GameStatus,
  sendingInterval: NodeJS.Timeout,
}

class Room implements IRoom {

  gameState: GameState
  players: Players

  constructor(players: Omit<Iplayer, "sendingInterval">[]) {
    players.forEach((player) => {
      this.players[generateUUID()] = {
        connection: player.connection,
        gameStatus: player.gameStatus,
        sendingInterval: null,
      }
    })

    const gameStatuses = {}  // рефактор
    this.playersIDs.forEach(id => {
     gameStatuses[id] = this.players[id].gameStatus
    });
    this.gameState = new GameState(gameStatuses)

    this.playersIDs.forEach((id) => {
      this.initDisconnectHandler(id)
      this.initMessageHandler(id)
      this.initStream(id)
    })

    console.log(`ROOM CREATED ${this.playersIDs}`)
  }

  get playersIDs() {
    return Object.keys(this.players)
  }

  initStream(id: string){
    this.players[id].connection.send(JSON.stringify({type : "START_GAME"}))
    this.players[id].sendingInterval = setInterval(() => {
      try {
        this.players[id].connection.send(JSON.stringify({type: "GAME_STATE", payload: this.gameState}))
      }
      catch(e) {
        console.log('error')
      }
    }, 20)
  }

  stopStreams(){
    this.playersIDs.forEach((id) => {
      clearTimeout(this.players[id].sendingInterval)
    })
  }

  initMessageHandler(id: string) {
    const connection = this.players[id].connection
    connection.on('message', msg => {
      const message = JSON.parse(msg.toString())
      this.gameState.eventHandler(message.payload, id)      // КОРРЕКТИРОВАТЬ ( if (type == ''))
    })
  }

  initDisconnectHandler(id: string) {
    const connection = this.players[id].connection
    connection.on('close', (reasonCode, description) => { 
      console.log('Disconnected ')
      console.dir({reasonCode, description})
      this.playersIDs.forEach((playerID) => {
        const player = this.players[playerID]
        if (playerID !== id && player.connection !== null) {
          this.stopStreams() 
          try {
            player.connection.send(JSON.stringify({type: "OPPONENT_LEAVE", payload: ''})) // SEND OPPONENT_LEAVE EVENT
          }
          catch(e) {
            console.log('error')
          }
        }
      player.connection = null
      })
    })
  }
}

export default Room
// comment for check 