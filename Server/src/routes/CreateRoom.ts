import {Router} from 'express'
import Room from '../Room'

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
  console.log("ПОДКЛЮЧИЛСЯ")
  connection.on('message', async (msg) => {
    console.log(msg)
    const message = await JSON.parse(msg.toString())
    message.type == 'ROOM_CODE' && manageCreateConnection(connection, message.payload)
  })
})

export {router, createConnections}
