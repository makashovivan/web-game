'use strict'


function Pos(x, y){
  this.x = x
  this.y = y 
} 

class GameState {

  constructor(){
    this.playerFirst = {
      pos: new Pos(10, 20),
      bullets: [],
    }
    this.playerSecond = {
      pos: new Pos(200, 20),
      bullets: [],
    }
    setInterval(() => this.gameLoop(), 20)
  }

  
  gameLoop(){
    this.playerFirst.bullets.forEach((bullet, index, bullets) => {
      if (bullet.x <= 520){bullet.x += 10}
      else {bullets.splice(index, 1)}
    })
    this.playerSecond.bullets.forEach((bullet, index, bullets) => {
      if (bullet.x >= 0){bullet.x -= 10}
      else {bullets.splice(index, 1)}
    })
    //console.log('keep going')
  }


  eventHandler(eventCode, player) {
    switch (eventCode){
      case 'Space':
        this[player].bullets.push({x: this[player].pos.x, y: this[player].pos.y}) 
        break
      case 'ArrowDown':
        this[player].pos.y += 10
        break
      case 'ArrowUp':
        this[player].pos.y -= 10
        break
      case 'ArrowRight':
        this[player].pos.x += 10
        break
      case 'ArrowLeft':
        this[player].pos.x -= 10
        break
      default:
        {}
        break	
    }
  }

  rotateScene(){

  }

}

module.exports = GameState