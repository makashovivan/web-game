import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import * as actions from '../../../../App/actions'
import {openSocket, handleClose} from '../../../../Common/Utils/sockets'


export function* roomSearchingSagaWatcher() {
  yield all([
    takeEvery(actions.SEARCHING_REQUEST, handleSearching),
  ])
}

function* handleSearching(action) {
  let gameSocket
  try {
    const response = yield call(checkStatus)
    const roomID = response.payload.roomID
    switch (response.state) {
      case "game":
        gameSocket = yield call(() => openSocket(`/api/Game/roomID/${roomID}`))
        break
      case "wait":
          const waitSocket = yield call(() => openSocket(`/api/SearchRoom/wait/roomID/${roomID}`))
          yield put({type: actions.SET_SOCKET, socket: waitSocket})
          yield put ({type: actions.SET_WAITING_TYPE, waitingType: "GameSearching"})
          const notification = yield call(() => waitOpponent(waitSocket))
          waitSocket.close(3200, "ИГРА НАЙДЕНА")
          console.log(`ожидающему пришло сокет-сообщение ${notification.data}`)
          gameSocket = yield call(() => openSocket(`/api/Game/roomID/${roomID}`)) 
        break  
    }  
    yield put({type: actions.SET_SOCKET, socket: gameSocket})
    yield put(actions.goToGameActionCreator(action.history))
    const potencialCloseEvent = yield call(() => handleClose(gameSocket))
    console.log(potencialCloseEvent)
  } catch(e) {
    console.error(e)
  }
}

const checkStatus = async () => {
  const response = await fetch('/api/SearchRoom')
  return response.json()
}

const waitOpponent = async (socket) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {reject('bad internet connection')}, 5000)
    socket.onmessage = (message) => {
      resolve(message)
    }
  })
}