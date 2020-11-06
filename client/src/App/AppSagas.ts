import { act } from '@testing-library/react'
import {takeEvery, put, all, select} from 'redux-saga/effects'
import {ActionTypes, Actions, appActions} from './AppReducer'
import {InferActionFromActions} from 'store'

export function* appSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("SET_WAITING_TYPE", handleWaitingtype),
    takeEvery<ActionTypes>("SET_PATH", handleRedirect)
  ])
}

function* handleRedirect(action: InferActionFromActions<Actions, "SET_PATH">) {
  const history = yield select(state => state.main.history)
  history.push(action.path)
}

function* handleWaitingtype(action: InferActionFromActions<Actions, "SET_WAITING_TYPE">) {
  
}


// function* handleGameRedirect(action) {
//   yield put({type: actions.SET_GAME_ACCES, gameAcces: true})
//   yield put({type: actions.SET_WAITING_TYPE, waitingType: null})
//   action.history.push('/Game')
// }

// function* handleMenuRedirect() {
//   const socket = yield select(state => state.socket)
//   if (socket !== null) socket.close()
//   yield put({type: actions.SET_SOCKET, socket: null})
//   yield put({type: actions.SET_ROOM_CODE, roomCode: null})
//   yield put({type: actions.SET_GAME_ACCES, gameAcces: false})
//   yield put({type: actions.SET_WAITING_TYPE, waitingType: null})
// }