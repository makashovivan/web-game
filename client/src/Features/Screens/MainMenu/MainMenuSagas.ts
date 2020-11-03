import {takeEvery, put, all, select} from 'redux-saga/effects'
import {ActionTypes, Actions, mainMenuActions} from './MainMenuReducer'
import {appActions} from '@App'
import {InferActionFromActions} from '@Store'


export function* mainMenuSagaWatcher() {
  yield all([
    takeEvery<ActionTypes>("INIT_GAME_SEARCHING", handleInitGameSearching),
    takeEvery<ActionTypes>("INIT_GAME_CREATING", handleInitGameCreating),
    takeEvery<ActionTypes>("INIT_GAME_JOINING", handleInitGameJoining)
  ])
}

function* handleInitGameSearching(action: InferActionFromActions<Actions, "INIT_GAME_SEARCHING">) {
  yield put(appActions.setWaitingType("RoomSearching"))
}

function* handleInitGameCreating(action: InferActionFromActions<Actions, "INIT_GAME_CREATING">) {
  yield put(appActions.setWaitingType("RoomCreating"))
}

function* handleInitGameJoining(action: InferActionFromActions<Actions, "INIT_GAME_JOINING">) {
  yield put(appActions.setWaitingType("RoomJoining"))
}

