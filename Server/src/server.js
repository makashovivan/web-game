'use strict'
const Room = require('./Room')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const express = require('express')
const ws = require('express-ws')


const app = express()
ws(app)



app.use('/', express.static(path.join(__dirname, '../../client/build')))  // SERVE STATIC 



// === WS ENDPOINT ===

app.ws('/ws', function (ws, req) {
  console.log('WS CONNECTED')
  setTimeout(() => {
    ws.send("START_GAME")
  }, 7000)
  ws.on('close', () => {
    console.log('WS CLOSED')
  })
})

// === =========== ===


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
})

app.listen(8000, () => {
  console.log('Listen port 8000')
})



// const connections = {} //  CONNECTIONS
// const rooms = {} //  ROOMS


// const emitter = new EventEmitter()
// emitter.on('delete', data => {
//   console.log('DELETE: ' + data.deleteConnection)
//   console.log('FREE NOW: ' + data.changeConnection)
//   console.log('DELETE ROOM: ' + data.room)
//   connections[data.changeConnection].isFree = true
//   delete connections[data.deleteConnection]
//   delete rooms[data.room]
// })


// const createRoom = () => {
//   let freeConnections = []
//   for (let key in connections){
//     if (connections[key].isFree){
//       freeConnections.push(connections[key])
//     }
//   }
//   if (freeConnections.length != 0 && freeConnections.length % 2 ==0){
//     for (let index = 0; index < freeConnections.length; index += 2){
//       const room = new Room(freeConnections[index], freeConnections[index + 1], emitter)
//       console.log('     ROOM CREATED ' + freeConnections[index].connectionId + ' ' + freeConnections[index + 1].connectionId)
//       freeConnections[index].isFree = false
//       freeConnections[index + 1].isFree = false
//       room.roomId = (~~(Math.random()*1e8)).toString(16) 
//       rooms[room.roomId] = room
//     }
//   }
// }


// ws.on('request', req => {
//   const connection = req.accept('', req.origin)  // CREATE WS CONNECTION
//   connection.connectionId = (~~(Math.random()*1e8)).toString(16)
//   connection.isFree = true
//   connections[connection.connectionId] = connection
//   console.log('=== CONNECTED № ' + connection.connectionId + ' ===')
//   console.dir('CLIENT IP: ' + connection.remoteAddress)
//   createRoom() // CREATE ROOM IF IT'S POSIBLE

//   connection.on('close', () => {  // DISCONNECT HANDLING FOR FREE CLIENTS
//     if (connection.isFree){
//       console.log('FREE CLIENT ' + connection.connectionId + ' DISCONNECTED')
//       delete connections[connection.connectionId]
//     }
//   })



// })
