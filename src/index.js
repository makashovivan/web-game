const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


game = {
  bullets: [],
  posFirst: {x: 10, y: 20},
  posSecond: {x: 200, y: 20},
}


const socket = new WebSocket('ws://192.168.0.140:8000/') // INIT WS CONNECTION

const onKeypress = (event) => {
  event.preventDefault()
}
document.addEventListener('keydown', (event) => {onKeypress(event)})

const rerender = (game) => {
  ctx.clearRect(0,0,1300,500)

  game.bullets.forEach(element => {
      if (element != null && element.x <= 500){
        ctx.fillRect(element.x, element.y, 5, 5)
      }
      else {}
    }
  )
  ctx.fillStyle = "Green"
  ctx.fillRect(game.posFirst.x, game.posFirst.y, 50, 50)
  ctx.fillStyle = "Red"
  ctx.fillRect(game.posSecond.x, game.posSecond.y, 50, 50)
  requestAnimationFrame(() => {rerender(game)})
}


let requestID = requestAnimationFrame(() => {rerender(game)})

