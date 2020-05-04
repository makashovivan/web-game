'use strict'
const GameState = require('./GameState')

class Room {

  constructor(player1Connection, player2Connection) {

    this.gameState = new GameState()                   // ROOMS GAMESTATE

    this.players = {                                   // PLAYERS IN ROOM
      [player1Connection.connectionId] : {
        id : player1Connection.connectionId,
        connection : player1Connection,
        gameStatus : 'playerFirst',
        sendingInterval : null
      },
      [player2Connection.connectionId] : {
        id : player2Connection.connectionId,
        connection : player2Connection,
        gameStatus : 'playerSecond',
        sendingInterval : null
      },
    }


    for (let key in this.players) {                    // INIT HANDLERS AND STREAMS
      this.initDisconnectHandler(this.players[key])
      this.initMessageHandler(this.players[key])
      this.initStream(this.players[key])
    }

  }


  initStream(player){
    player.sendingInterval = setInterval(() => {
      player.connection.send(JSON.stringify({type: "GAME_STATE", payload: this.gameState}))
    }, 20)
  }

  stopStreams(){
    for (let key in this.players) {
      clearTimeout(this.players[key].sendingInterval)
    }

  }


  initMessageHandler(player){
    const connection = player.connection
    connection.on('message', msg => {
      const message = JSON.parse(msg)
      this.gameState.eventHandler(message.payload, player.gameStatus)      // КОРРЕКТИРОВАТЬ ( if (type == ''))
    })
  }

  initDisconnectHandler(player){
    const connection = player.connection
    connection.on('close', (reasonCode, description) => {
      console.log('Disconnected ' + connection.connectionId)
      console.dir({reasonCode, description})
      for (let key in this.players) {                                                         
        if (key !== player.id && this.players[key].connection !== null) {
          this.stopStreams() 
          this.players[key].connection.send(JSON.stringify({type: "OPPONENT_LEAVE", payload: ''})) // SEND OPPONENT_LEAVE EVENT
          this.players[key].connection = null
        }
      this.players[key].connection = null
      }
    })
  }

}

module.exports = Room