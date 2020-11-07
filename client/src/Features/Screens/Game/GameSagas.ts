import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import {appActions} from '@App'
import {ActionTypes, Actions, gameActions} from './GameReducer'
import {openSocket, handleClose} from '@Common/Utils/sockets'
import {httpGet, httpPost} from '@Common/Utils/api'
import { InferActionFromActions } from '@Common/Types/ReduxTypes'


export function* gameSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("CONNECT_TO_ROOM", handleRoomConnecting),
  ])
}

function* handleRoomConnecting(action: InferActionFromActions<Actions, "CONNECT_TO_ROOM">) {
  try {
    console.log("ТЫ В ИГРЕ!")
    yield put(appActions.setWaitingType(null))
    yield put(appActions.setGameAccess(true))
    yield put(appActions.setPath("/Game"))
  } catch(e) {
    
  }
}

const openGameSocket = (roomID) => {
  return openSocket(`/api/Game/roomID/${roomID}`)
}
