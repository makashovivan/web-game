import {takeEvery, put, all, select} from 'redux-saga/effects'
import {ActionTypes, Actions, mainMenuActions} from './MainMenuReducer'
import {appActions} from '@App'
import {roomSearchingActions} from '@Features/WaitingWidgets/RoomSearching'
import {InferActionFromActions} from '@Common/Types/ReduxTypes'


export function* mainMenuSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("INIT_ROOM_SEARCHING", handleInitRoomSearching),
    takeEvery<ActionTypes>("INIT_ROOM_CREATING", handleInitRoomCreating),
  ])
}

function* handleInitRoomSearching(action: InferActionFromActions<Actions, "INIT_ROOM_SEARCHING">) {
  yield put(appActions.setWaitingType("RoomSearching"))
  yield put(roomSearchingActions.requestRoomSearching())
}

function* handleInitRoomCreating(action: InferActionFromActions<Actions, "INIT_ROOM_CREATING">) {
  yield put(appActions.setWaitingType("RoomCreating"))
}

