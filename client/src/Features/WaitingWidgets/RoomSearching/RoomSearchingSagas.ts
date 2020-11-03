import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import {appActions} from '@App'
import {ActionTypes, Actions, roomSearchingActions} from './RoomSearchingReducer'
import {openSocket, handleClose} from '@Common/Utils/sockets'
import {httpGet, httpPost} from '@Common/Utils/api'
import { InferActionFromActions } from 'Main/store'


export function* roomSearchingSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("REQUEST_GAME_SEARCHING", handleSearchingRequest),
  ])
}

function* handleSearchingRequest(action: InferActionFromActions<Actions, "REQUEST_GAME_SEARCHING">) {
  console.log(action.type)
  let gameSocket
  try {
    const status = yield call(checkStatus)
    const roomID = status.payload.roomID
    switch (status.state) {
      case "game":
        gameSocket = yield call(startGame, roomID)
        break
      case "wait":
        gameSocket = yield* startWaiting(roomID)
        break  
    }  
    // установка игрового сокета в редюсере страницы игры
    //yield put({type: actions.SET_SOCKET, socket: gameSocket})
    yield put(appActions.setPath("/Game", action.history))
    const potencialCloseEvent = yield call(handleClose, gameSocket)
    console.log(potencialCloseEvent)
  } catch(e) {
    console.error(e)
  }
}

function* startWaiting(roomID) {
  console.log("START_WAITING")
  const waitSocket = yield call(startWait, roomID)
  yield put(roomSearchingActions.setSearchingSocket(waitSocket))
  yield put(appActions.setWaitingType("RoomSearching"))
  const notification = yield call(waitOpponent, waitSocket)
  waitSocket.close(3200, "ИГРА НАЙДЕНА")
  console.log(`ожидающему пришло сокет-сообщение ${notification.data}`)
  yield call(startGame, roomID)
}

const checkStatus = () => {
  return httpGet('/api/SearchRoom')
}

const startGame = (roomID) => {
  return openSocket(`/api/Game/roomID/${roomID}`)
}

const startWait = (roomID) => {
  return openSocket(`/api/SearchRoom/wait/roomID/${roomID}`)
}

const waitOpponent = async (socket) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {reject('bad internet connection')}, 5000)
    socket.onmessage = (message) => {
      resolve(message)
    }
  })
}