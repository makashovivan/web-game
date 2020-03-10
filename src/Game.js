



window.Pos = function Pos(x, y){
  this.x = x
  this.y = y 
} 

export default class Game {
  constructor(){
    this.bullets = []
    this.posFirst = new Pos(10, 20)
    this.posSecond = new Pos(40, 20)
  }
}