'use strict'
const GameState = require('./GameState')

class Room{
  constructor(player1Connection, player2Connection, emitter){

    this.emitter = emitter

    this.player1 = {
      connection: player1Connection,
      gameStatus: 'playerFirst'
    }
    this.player2 = {
      connection: player2Connection,
      gameStatus: 'playerSecond'
    }
    this.gameState = new GameState()

    this.initDisconnectHandler(this.player1)
    this.initDisconnectHandler(this.player2)
    this.initMessageHandler(this.player1)
    this.initMessageHandler(this.player2)
    this.initStream(this.player1.connection)
    this.initStream(this.player2.connection)
  }

  initStream(connection){
    let sendingInterval = setInterval(() => {
      connection.send(JSON.stringify(this.gameState))
    }, 20)
  }


  initMessageHandler(player){
    const connection = player.connection
    connection.on('message', message => {
      //console.log('newMessage: ' + message.utf8Data)
      this.gameState.eventHandler(message.utf8Data, player.gameStatus)
    })
  }

  initDisconnectHandler(player){
    const connection = player.connection
    connection.on('close', (reasonCode, description) => {

      console.log('Disconnected ' + connection.connectionId)
      console.dir({reasonCode, description})
      this.emitter.emit('delete', {deleteConnection: connection.connectionId,
                                   changeConnection: this.getChangeConnection(connection.connectionId),
                                   room: this.roomId})
      // this.player1.connection.removeListener('close',() => {'LISTENER REMOVED'})
      // this.player2.connection.removeListener('close',() => {'LISTENER REMOVED'})                           
      this.player1.connection = null
      this.player2.connection = null
      delete this.player1
      delete this.player2                          
    
    })

  }



  getChangeConnection(id){
    if (id != this.player1.connection.connectionId){
      return this.player1.connection.connectionId
    }
    return this.player2.connection.connectionId
  }





}

module.exports = Room