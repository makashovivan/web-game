
export default class GameController {
  requestID: number
  socket: WebSocket
  ctx: any
  gameState: any
  constructor(socket, ctx, onOpponentLeave){
    this.requestID = null
    this.socket = socket
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

    this.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "GAME_STATE":
          this.gameState = message.payload
          break
        case "OPPONENT_LEAVE":
          onOpponentLeave()
          break 
        }
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

  onKeyPress(event) {     
    event.preventDefault()
    this.socket.send(JSON.stringify({type: '', payload: event.code}))
  }

}