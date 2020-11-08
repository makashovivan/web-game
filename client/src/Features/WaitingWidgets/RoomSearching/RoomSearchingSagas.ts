import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import {appActions} from '@App'
import {ActionTypes, Actions, roomSearchingActions} from './RoomSearchingReducer'
import {openSocket, handleClose, getFirstMessage} from '@Common/Utils/sockets'
import {httpGet, httpPost} from '@Common/Utils/api'
import {InferActionFromActions} from '@Common/Types/ReduxTypes'
import {gameActions} from '@Features/Screens/Game'
import {SearchingStatusType} from '@CommonTypes/SearchingStatusType'



export function* roomSearchingSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("REQUEST_ROOM_SEARCHING", handleSearchingRequest),
  ])
}

function* handleSearchingRequest(action: InferActionFromActions<Actions, "REQUEST_ROOM_SEARCHING">) {
  try {
    const status: SearchingStatusType = yield call(checkStatus)
    const roomId = status.roomId
    switch (status.status) {
      case "GAME":
        yield put(gameActions.connectToRoom(roomId))
        break
      case "WAIT":
        yield* waitOpponent(roomId)
        break  
    }  
  } catch(e) {
    console.error(e)
  }
}

function* waitOpponent(roomID) {
  try {
    console.log("WAIT_ROOM")
    // const roomSearchingSocket = yield call(openSearchingSocket, roomID)
    // yield put(roomSearchingActions.setSearchingSocket(roomSearchingSocket))
    // yield call(getFirstMessage, roomSearchingSocket)
    yield call(testWait)
    yield put(gameActions.connectToRoom(roomID)) 
  } catch(e) {

  }
}

const testWait = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100000)
  })
}

const checkStatus = () => {
  //return httpGet<SearchingStatusType>('/api/SearchRoom')
  return {
    status: "WAIT",
    roomId: "123",
  }
}

const openSearchingSocket = (roomID) => {
  return openSocket(`/api/SearchRoom/wait/roomID/${roomID}`)
}

