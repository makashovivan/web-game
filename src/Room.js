'use strict'
const GameState = require('./GameState')

class Room{
  constructor(player1Connection, player2Connection){
    this.player1 = {
      connection: player1Connection,
      gameStatus: 'playerFirst'
    }
    this.player2 = {
      connection: player2Connection,
      gameStatus: 'playerSecond'
    }
    this.gameState = new GameState()
  }
}

module.exports = Room