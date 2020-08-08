import { takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from '../reducers/root/actions'
import { openSocket } from '../utils/sockets'


export function* gameSearchingSagaWatcher() {
  yield all([
    takeEvery(actions.SEARCHING_REQUEST, handleSearching),
  ])
}

const initGameSearchingChannel = (socket, history) => {
  return eventChannel(emitter => {
    socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          emitter(actions.goToGameActionCreator(history))
          break
      }
    }
    // функция отписки от канала
    return () => {

    }
  })
}

function* handleSearching(action) {
  const socket = yield call(() => openSocket('ws://localhost:8000/ws/SearchRoom'))

  yield put({type: actions.SET_SOCKET, socket})
  yield put ({type: actions.SET_GAME_SEARCHING, gameSearching: true})

  const channel = yield call(initGameSearchingChannel, socket, action.history)
  try {    
    while (true) {
      const message = yield take(channel)
      yield put(message)
      // при возвращении каналом END сработает обычный brake
      console.log(`socket : ${message}`)
    }
  } finally {
    console.log('socket terminated')
  }
}
