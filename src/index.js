import Game from './Game'


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let gameState = new Game

// const rerender = (gameState) => {

// }

// const timerId = setInterval(() => {
//   rerender()
// }, 1000);

ctx.fillStyle = "green";
ctx.fillRect(gameState.posFirst.x, gameState.posFirst.y, 100, 100);