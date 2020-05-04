'use strict'
const Room = require('./Room')


class RoomManager {
  constructor() {
    this.connections = {}
  }


  addConnection(connection) {

    connection.connectionId = (~~(Math.random()*1e8)).toString(16)                // CREATE ID 
    this.connections[connection.connectionId] = connection                        // PUSH TO CONNECTIONS
    console.log('=== CONNECTED № ' + connection.connectionId + ' ===')
    this.createRoom()                                                             // CREATE ROOM IF IT'S POSIBLE
    
    connection.on('close', () => {                                                // DISCONNECT HANDLING FOR FREE CLIENTS
      if (connection.connectionId in this.connections){
        console.log('FREE CLIENT ' + connection.connectionId + ' DISCONNECTED')  
        delete this.connections[connection.connectionId]
      }
    })
  }


  createRoom() {
    let ids = Object.keys( this.connections )
    if (ids.length === 2) {
      
        const room = new Room(this.connections[ids[0]], this.connections[ids[1]])
        console.log('     ROOM CREATED ' + ids[0] + ' ' + ids[1])
        this.connections[ids[0]].send(JSON.stringify({type : "START_GAME"}))
        this.connections[ids[1]].send(JSON.stringify({type : "START_GAME"}))
        delete this.connections[ids[0]]
        delete this.connections[ids[1]]
    }
  }
}

module.exports = RoomManager