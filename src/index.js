'use strict'

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let gameState = {
  playerFirst:{
    pos: {x: 10, y: 20},
    bullets: [],
  },
  playerSecond: {
    pos: {x: 200, y: 20},
    bullets: [],
  },
}


const socket = new WebSocket('ws://192.168.0.140:8000/') // INIT WS CONNECTION


socket.onmessage = data => {
  //console.log('data: ' + data.data)
  //debugger
  gameState = JSON.parse(data.data)
}


const onKeypress = (event) => {
  event.preventDefault()
  console.log(event.code)
  socket.send(event.code)
}
document.addEventListener('keydown', (event) => {onKeypress(event)})

const rerender = () => {
  ctx.clearRect(0,0,1300,500)

  ctx.fillStyle = "Green"
  ctx.fillRect(gameState.playerFirst.pos.x, gameState.playerFirst.pos.y, 50, 50)
  gameState.playerFirst.bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, 5, 5)
  })

  ctx.fillStyle = "Red"
  ctx.fillRect(gameState.playerSecond.pos.x, gameState.playerSecond.pos.y, 50, 50)
  gameState.playerSecond.bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, 5, 5)
  })  

  requestAnimationFrame(() => {rerender()})
}


let requestID = requestAnimationFrame(() => {rerender()})

