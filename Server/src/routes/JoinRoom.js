const {Router} = require('express') 
const router = Router()
const Room = require('../Room')

const createConnections = require('./CreateRoom').createConnections

const manageJoinConnection = (connection, code) => {
  let ids = Object.keys( createConnections )
  ids.forEach(id => {
    if (id == code) {
      const room = new Room(connection, createConnections[id])
      delete createConnections[id]
      return
    }
  })
}

router.ws('/', (connection, res) => {
  console.log("NEW JOINER ")
  connection.on('message', (msg) => {
    const message = JSON.parse(msg)
    console.dir("ROOMJOINER MESSAGE: " + msg)
    (message.type == 'ROOM_CODE') && manageJoinConnection(connection, message.payload)
  })
})

module.exports = router