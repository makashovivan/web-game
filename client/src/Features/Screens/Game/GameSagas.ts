import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import {appActions} from '@App'
import {ActionTypes, Actions, gameActions} from './GameReducer'
import {openSocket, handleClose} from '@Common/Utils/sockets'
import {httpGet, httpPost} from '@Common/Utils/api'
import { InferActionFromActions } from 'store'
import createHistory from 'history/createBrowserHistory';


export function* gameSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("CONNECT_TO_ROOM", handleRoomConnecting),
  ])
}

function* handleRoomConnecting(action: InferActionFromActions<Actions, "CONNECT_TO_ROOM">) {
  try {
    const history = createHistory()
    console.log("ТЫ В ИГРЕ!")
    yield put(appActions.setWaitingType(null))
    yield put(appActions.setPath("/Game", history))
  } catch(e) {
    
  }
}

const openGameSocket = (roomID) => {
  return openSocket(`/api/Game/roomID/${roomID}`)
}
