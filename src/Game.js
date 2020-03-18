'use strict'

function Pos(x, y){
  this.x = x
  this.y = y 
} 

class Game {

  constructor(){
    this.bullets = []
    this.posFirst = new Pos(10, 20)
    this.posSecond = new Pos(200, 20)
  }

  bulletLoop(bullet){
    let timerId = setInterval(() => {
      this.bullets[bullet].x += 5
      if (this.bullets[bullet].x >= 505){
        this.bullets[bullet] = null
        clearInterval(timerId)
      }
    }, 5)
  }

  eventHandler(eventCode, position) {
    switch (eventCode){
      case 'Space':
      const id = this.getFreeSpot()
      this.bullets[id] = new Pos(position.x + 50,position.y + 25)
      this.bulletLoop(id)
        break
      case 'ArrowDown':
      position.y += 10
        break
      case 'ArrowUp':
      position.y -= 10
        break
      case 'ArrowRight':
      position.x += 10
        break
      case 'ArrowLeft':
      position.x -= 10
        break
      default:
        {}
        break	
      }
    }

  getFreeSpot() {
    let freeSpot = -10
    this.bullets.forEach((element, i) =>{
      if (!element){
        freeSpot = i
        return
      }
    })
    if (freeSpot != -10){return freeSpot}
    return this.bullets.length 
  }
}

module.exports = Game