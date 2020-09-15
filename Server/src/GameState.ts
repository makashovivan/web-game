import {Iplayer, Players} from "./Room"

type Position = {x: number, y: number}

const INITIAL_LEFT_POS: Position = {x: 10, y: 20} 
const INITIAL_RIGHT_POS: Position = {x: 200, y: 20}

export type GameStatus = 'playerFirst' | 'playerSecond'

interface IplayerState {
  position: Position,
  gameStatus: GameStatus,
  bullets: Position[],
}

interface IGameState {
  playersStates: Record<string, IplayerState>
}

export class GameState implements IGameState {

  playersStates: Record<string, IplayerState>

  constructor(players: Record<string, GameStatus>) {

    Object.keys(players).forEach((id) => {
      this.playersStates[id] = {
        position: players[id] === "playerFirst" ? INITIAL_LEFT_POS : INITIAL_RIGHT_POS,
        gameStatus: players[id],
        bullets: [], 
      }
    })

    // this.playersStates = [
    //   {
    //     position: {x: 10, y: 20},
    //     gameStatus: "playerFirst",
    //     bullets: [],
    //   },
    //   {
    //     position: {x: 200, y: 20},
    //     gameStatus: "playerSecond",
    //     bullets: [],
    //   },
    // ]


    setInterval(() => this.gameLoop(), 20)
  }

  get playersStatesIDs() {
    return Object.keys(this.playersStates)
  }

  
  gameLoop() {
    this.playersStatesIDs.forEach(id => {
      this.playersStates[id].bullets.forEach((bullet, index, bullets) => {
        this.moveBullet(bullet, index, bullets, this.playersStates[id].gameStatus)
      });
    })
  }

  moveBullet(bullet: Position, index: number, bullets: Position[], gameStatus: GameStatus) {
    if (gameStatus === "playerFirst") {
      if (bullet.x <= 520){
        bullet.x += 10}
      else {
        bullets.splice(index, 1)}
    } else if (gameStatus === "playerSecond") {
      if (bullet.x >= 0){
        bullet.x -= 10}
      else {
        bullets.splice(index, 1)}
    }
  }


  eventHandler(eventCode: string, id: string) {
    const gameStatus = this.playersStates[id].gameStatus
    const playerPosition: Position =  {x: this.playersStates[id].position.x, y: this.playersStates[id].position.y}
    switch (eventCode){
      case 'Space':
        this.playersStates[id].bullets.push(playerPosition)
        // this[player].bullets.push({x: this[player].pos.x, y: this[player].pos.y}) 
        break
      case 'ArrowDown':
        this.playersStates[id].position.y += 10
        break
      case 'ArrowUp':
        this.playersStates[id].position.y -= 10
        break
      case 'ArrowRight':
        this.playersStates[id].position.x += 10
        break
      case 'ArrowLeft':
        this.playersStates[id].position.x -= 10
        break
      default:
        {}
        break	
    }
  }

  rotateScene(){

  }

}

