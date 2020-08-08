import { takeEvery, put, call, all, select } from 'redux-saga/effects'
import * as actions from '../reducers/root/actions'
import { openSocket } from '../utils/sockets'


export function* rootSagaWatcher() {
  yield all([
    takeEvery(actions.GO_TO_GAME, handleGameRedirect),
    takeEvery(actions.GO_TO_MENU, handleMenuRedirect),
  ])
}


function* handleGameRedirect(action) {
  yield put({type: actions.SET_GAME_ACCES, gameAcces: true})
  yield put({type: actions.SET_GAME_SEARCHING, gameSearching: false})
  yield put({type: actions.SET_GAME_CREATING, gameCreating: false})
  action.history.push('/Game')
}

function* handleMenuRedirect() {
  const socket = yield select(state => state.socket)
  if (socket !== null) socket.close()
  yield put({type: actions.SET_SOCKET, socket: null})
  yield put({type: actions.SET_ROOM_CODE, roomCode: null})
  yield put({type: actions.SET_GAME_ACCES, gameAcces: false})
  yield put({type: actions.SET_GAME_SEARCHING, gameSearching: false})
  yield put({type: actions.SET_GAME_CREATING, gameCreating: false })
}
