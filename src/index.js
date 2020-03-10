import Game from './Game'



// === SERVER ===


const bulletLoop = (bullet) => {
  let timerId = setInterval(() => {
    gameState.bullets[bullet].x += 5
    if (gameState.bullets[bullet].x >= 505){
      gameState.bullets[bullet] = null
      clearInterval(timerId)
      return
    }
  }, 5)
}


const getFreeSpot = () => {
  let freeSpot = -10
  gameState.bullets.forEach((element, i) =>{
    if (!element){
      freeSpot = i
      return
    }
  })
  if (freeSpot != -10){return freeSpot}
  return gameState.bullets.length 
}



// === CLIENT ===


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let gameState = new Game
ctx.fillStyle = "Green";


const onKeypress = (event) => {
  event.preventDefault()
  switch (event.code){
    case 'Space':
      const id = getFreeSpot()
      gameState.bullets[id] = new Pos(gameState.posFirst.x + 50, gameState.posFirst.y + 25)
      bulletLoop(id)
      break
    case 'ArrowDown':
      gameState.posFirst.y += 10
      break
    case 'ArrowUp':
      gameState.posFirst.y -= 10
      break
    case 'ArrowRight':
      gameState.posFirst.x += 10
      break
    case 'ArrowLeft':
      gameState.posFirst.x -= 10
      break
    default:
      {}
      break;	
  }
}
document.addEventListener('keydown', (event) => {onKeypress(event)})

const rerender = (gameState) => {
  ctx.clearRect(0,0,1300,500)
  gameState.bullets.forEach(element => {
      if (element != null && element.x <= 500){
        ctx.fillRect(element.x, element.y, 5, 5)
      }
      else {}
    }
  )
  ctx.fillRect(gameState.posFirst.x, gameState.posFirst.y, 50, 50);
  ctx.fillRect(gameState.posFirst.x, gameState.posFirst.y, 50, 50);
  requestAnimationFrame(() => {rerender(gameState)})
}


let requestID = requestAnimationFrame(() => {rerender(gameState)})

