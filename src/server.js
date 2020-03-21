'use strict'

const GameState = require('./GameState')
const Room = require('./Room')
const fs = require('fs')
const path = require('path')
const http = require('http')
const Websocket = require('websocket').server


// === STATIC FILES ===
const index = fs.readFileSync('./index.html', 'utf8')
const script = fs.readFileSync('./index.js', 'utf8')
const icon = fs.readFileSync('./favicon.ico')


// === SERVE STATIC ===
const server = http.createServer((req, res) => {

  let filePath = path.join(__dirname, 'src', req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(filePath)
  let contentType = 'text/html'
  let content

  switch (ext) {
    case '.ico':
      contentType = 'image/ico'
      content = icon
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      content = script
      break
    default:
      contentType = 'text/html'
      content = index
  }
  console.log(req.url)
  res.writeHead(200)
  res.end(content)
})

server.listen(8000, () => {
  console.log('Listen port 8000')
})

// === UPGRADE TO WS SERVER ===

const ws = new Websocket({
  httpServer: server,
  autoAcceptConnections: false
})


const connections = {} //  CONNECTIONS
const rooms = {} //  ROOMS


const createRoom = () => {
  let freeConnections = []
  for (let key in connections){
    if (connections[key].isFree){
      freeConnections.push(connections[key])
    }
  }
  if (freeConnections.length != 0 && freeConnections.length % 2 ==0){
    for (let index = 0; index < freeConnections.length; index += 2){
      const room = new Room(freeConnections[index], freeConnections[index + 1])
      console.log('     ROOM CREATED ' + freeConnections[index].connectionId + ' ' + freeConnections[index + 1].connectionId)
      freeConnections[index].isFree = false
      freeConnections[index + 1].isFree = false
      room.roomId = (~~(Math.random()*1e8)).toString(16)
      rooms[room.roomId] = room
    }
  }
}


ws.on('request', req => {
  const connection = req.accept('', req.origin)  // CREATE WS CONNECTION
  connection.connectionId = (~~(Math.random()*1e8)).toString(16)
  connection.isFree = true
  connections[connection.connectionId] = connection
  console.log('=== CONNECTED № ' + connection.connectionId + ' ===')
  console.dir('CLIENT IP: ' + connection.remoteAddress)
  createRoom()
})
