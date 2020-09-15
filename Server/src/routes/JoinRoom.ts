import {Router} from 'express'
import Room from '../Room'
import {createConnections} from './CreateRoom'
const router = Router()


const manageJoinConnection = (connection, code) => {
  let ids = Object.keys( createConnections )
  ids.forEach(id => {
    if (id == code) {
      //const room = new Room(connection, createConnections[id])
      delete createConnections[id]
      return
    }
  })
}

router.ws('/', (connection, res) => {
  console.log("NEW JOINER ")
  connection.on('message', (msg) => {
    const message = JSON.parse(msg.toString())
    console.dir("ROOMJOINER MESSAGE: " + msg)
    message.type == 'ROOM_CODE' && manageJoinConnection(connection, message.payload)
  })
})

router.get('/', async (req, res) => {
  console.log("Получил GET запрос")
  const dataToSend = JSON.stringify({info: "ИНФА С GET"})
  try {
    //res.set('Access-Control-Allow-Origin', '*')
    res.send(dataToSend)
  } catch(e) {
    console.log(e)
  }

  //res.send({info: "ИНФА С GET"})
})

export {router}