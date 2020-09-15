import {Router} from 'express'
import ExpressWs from 'express-ws'
import {generateUUID} from '../utils/utils'
import {Rooms} from './Game'
import ws from 'ws';
const router: ExpressWs.Router = Router()


let SearchingConnections: Record<string, ws> = {}

router.get('/', async (req, res) => {
  if (checkSearchingConnections()) {
    const roomID = getFirstSearchingConnection()
    Rooms[roomID] = []
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
  SearchingConnections[roomID] = connection
  connection.onclose = () => {
    if (roomID in SearchingConnections){
      console.log(`FREE SEARCHING CLIENT ${roomID} DISCONNECTED`)  
      delete  SearchingConnections[roomID]
    }
  }

  // connection.on('close', () => {
  //   if (roomID in SearchingConnections){
  //     console.log(`FREE SEARCHING CLIENT ${roomID} DISCONNECTED`)  
  //     delete  SearchingConnections[roomID]
  //   }
  // })
})
                     
const checkSearchingConnections = () => {
  const ids = Object.keys(SearchingConnections)
  return ids.length >= 1
}

const getFirstSearchingConnection = () => {
  const ids: string[] = Object.keys(SearchingConnections)
  return ids[0]
}

const notificateWaiter = (waiterID: string) => {
  SearchingConnections[waiterID].send('Abstract message')
}


export {router}