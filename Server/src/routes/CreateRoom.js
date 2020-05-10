const {Router} = require('express') 
const Room = require('../Room')

const router = Router()
const createConnections = {}



const manageCreateConnection = (connection, code) => {

  connection.connectionId = code
  createConnections[connection.connectionId] = connection
  console.log('=== CONNECTED CREATOR № ' + connection.connectionId + ' ===')

  connection.on('close', () => {
    if (connection.connectionId in createConnections){
      console.log('FREE CREATOR CLIENT ' + connection.connectionId + ' DISCONNECTED')  
      delete createConnections[connection.connectionId]
    }
  })
}



router.ws('/', (connection, res) => {
  connection.on('message', (msg) => {
    const message = JSON.parse(msg)
    if (message.type == 'ROOM_CODE') manageCreateConnection(connection, message.payload)
  })
})

module.exports = {router, createConnections}
