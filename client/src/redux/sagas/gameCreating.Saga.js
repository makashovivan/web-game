import { takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from '../reducers/root/actions'
import { openSocket } from '../utils/sockets'


export function* gameCreatingSagaWatcher() {
  yield all([
    takeEvery(actions.CREATING_REQUEST, handleCreating),
  ])
}

const initGameCreatingChannel = (socket, history, roomCode) => {
  return eventChannel(emitter => {
    socket.onopen = () => {                                          
      socket.send(JSON.stringify({type: 'ROOM_CODE', payload: roomCode }))
    }
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

function* handleCreating(action) {
  const socket = yield call(() => openSocket('ws://localhost:8000/ws/CreateRoom'))
  const roomCode = (~~(Math.random()*1e8)).toString(16)
  yield put({type: actions.SET_SOCKET, socket})
  yield put({type: actions.SET_GAME_CREATING, gameCreating: true})
  yield put({type: actions.SET_ROOM_CODE, roomCode})

  const channel = yield call(initGameCreatingChannel, socket, action.history, roomCode)
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
