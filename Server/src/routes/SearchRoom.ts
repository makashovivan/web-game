import {Router} from 'express'
import ExpressWs from 'express-ws'
import {generateUUID} from '../utils/utils'
import {Rooms} from './Game'
import ws from 'ws';
const router: ExpressWs.Router = Router()


let SearchingConnections: Map<string, ws> = new Map()

router.get('/', async (req, res) => {

  if (SearchingConnections.size) {
    const roomID = getFirstSearchingConnection()
    Rooms.set(roomID, [])
    notificateWaiter(roomID)

    //delete  SearchingConnections[roomID]
    //SearchingConnections[roomID].
    res.json({state: "game", payload: {roomID}})
  } else {
    const roomID = generateUUID()
    res.json({state: "wait", payload: {roomID}})
  }
})

router.ws('/wait/roomID/:room_id', (connection, res) => {
  const roomID = res.params.room_id
  console.log(`кладем в searchingConnection ${roomID}`)
  SearchingConnections.set(roomID, connection)
  connection.onclose = () => {
    if (SearchingConnections.has(roomID)){
      console.log(`FREE SEARCHING CLIENT ${roomID} DISCONNECTED`)
      SearchingConnections.delete(roomID)
    }
  }

  // connection.on('close', () => {
  //   if (roomID in SearchingConnections){
  //     console.log(`FREE SEARCHING CLIENT ${roomID} DISCONNECTED`)  
  //     delete  SearchingConnections[roomID]
  //   }
  // })
})

const getFirstSearchingConnection = () => {
  const ids: string[] = Object.keys(SearchingConnections)
  return ids[0]
}

const notificateWaiter = (waiterID: string) => {
  SearchingConnections.get(waiterID).send('Abstract message')
}


export {router}