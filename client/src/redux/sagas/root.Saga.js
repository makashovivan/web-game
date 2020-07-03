import { takeEvery, put, call, all, select } from 'redux-saga/effects'
import * as actions from '../reducers/root/actions'



export function* rootSagaWatcher() {
  yield all([
    takeEvery(actions.SEARCHING_REQUEST, handleSearching),
    takeEvery(actions.CREATING_REQUEST, handleCreating),
    takeEvery(actions.JOINING_REQUEST, handleJoining),
    takeEvery(actions.GO_TO_GAME, handleGameRedirect),
    takeEvery(actions.GO_TO_MENU, handleMenuRedirect),
  ])
}

const openSocket = (path) => {                  // ДОРАБОТАТЬ ПОВЕДЕНИЕ ПРИ ОШИБКЕ
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(path)
    setTimeout(() => {reject('bad internet connection')}, 5000)
    socket.onopen = () => {resolve(socket)}
    socket.onerror = (e) => {reject(e)}
  }).then(socket => socket)
    .catch((e) => console.log(e) )
}

function* handleSearching() {
  const socket = yield call(() => openSocket('ws://localhost:8000/ws/SearchRoom'))
  yield put({type: actions.SET_SOCKET, socket})
  yield put ({type: actions.SET_GAME_SEARCHING, gameSearching: true})
}

function* handleCreating() {
  const socket = yield call(() => openSocket('ws://localhost:8000/ws/CreateRoom'))
  const roomCode = (~~(Math.random()*1e8)).toString(16)
  yield put({type: actions.SET_SOCKET, socket})
  yield put({type: actions.SET_GAME_CREATING, gameCreating: true})
  yield put({type: actions.SET_ROOM_CODE, roomCode})
}

function* handleJoining() {
  const socket = yield call(() => openSocket('ws://localhost:8000/ws/JoinRoom'))
  yield put({type: actions.SET_SOCKET, socket})
}

function* handleGameRedirect() {
  yield put({type: actions.SET_GAME_ACCES, gameAcces: true})
  yield put({type: actions.SET_GAME_SEARCHING, gameSearching: false})
  yield put({type: actions.SET_GAME_CREATING, gameCreating: false})
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
