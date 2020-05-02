

export default class GameController {
  constructor(socket, ctx){

    this.requestID = null

    this.socket = socket

    this.socket.onmessage = msg => {
      //....
      //gameState = JSON.parse(data.data)
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

    console.log('drawing')
    this.ctx.clearRect(0,0,1000,400)  // CLEAR FIELD

    // === FIRST PLAYER ===
    this.ctx.fillStyle = "Green"
    this.ctx.fillRect(this.gameState.playerFirst.pos.x, this.gameState.playerFirst.pos.y, 50, 50)
    this.gameState.playerFirst.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5)
    })
    
    // === SECOND PLAYER ===
    this.ctx.fillStyle = "Red"
    this.ctx.fillRect(this.gameState.playerSecond.pos.x, this.gameState.playerSecond.pos.y, 50, 50)
    this.gameState.playerSecond.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, 5, 5)
    })  
  
    this.requestID = requestAnimationFrame(() => {this.reDraw()})
  }

  initDrawing() {
    this.requestID = requestAnimationFrame(() => {this.reDraw()})
  }

  stopDrawing() {
    cancelAnimationFrame(this.requestID)

  }

}