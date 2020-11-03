import {Router} from 'express'
import ExpressWs from 'express-ws'
import Room from '../Room'
import * as ws from 'ws';
const router = Router()

let Rooms: Map<string, ws[]> = new Map()

router.ws('/roomID/:room_id', async (connection, res) => {
  const roomID = res.params.room_id

  if (Rooms.has(roomID)) {
    Rooms[roomID].push(connection)
    console.log(`Подключился игрок №${Rooms[roomID].length}`)
    if (checkRoomReadyState(Rooms[roomID])) {
      console.log(`Создаем комнату`)
      //const room = new Room(Rooms[roomID][0], Rooms[roomID][1])
      const room = new Room([
        {connection: Rooms[roomID][0], gameStatus: "playerFirst"}, //
        {connection: Rooms[roomID][1], gameStatus: "playerSecond"}
      ])
    }
  }
})

const checkRoomReadyState = (room: ws[]) => {
  return room.length === 2 
}

export {router, Rooms}