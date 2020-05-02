

export default class GameController {
  constructor(socket, ctx){


    this.socket = socket

    this.socket.onmessage = msg => {
      //....
    }

    this.ctx = ctx

    this.gameState =  {
      playerFirst:{
        pos: {x: 10, y: 20},
        bullets: [],
      },
      playerSecond: {
        pos: {x: 200, y: 20},
        bullets: [],
      },
    }

  }

  reDraw(){


    this.ctx.clearRect(0,0,1000,400)

    this.ctx.fillStyle = "Green"
    this.ctx.fillRect(this.gameState.playerFirst.pos.x, this.gameState.playerFirst.pos.y, 50, 50)
    this.gameState.playerFirst.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5)
    })
  
    this.ctx.fillStyle = "Red"
    this.ctx.fillRect(this.gameState.playerSecond.pos.x, this.gameState.playerSecond.pos.y, 50, 50)
    this.gameState.playerSecond.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5)
    })  
  
    requestAnimationFrame(() => {this.reDraw()})
  }

}