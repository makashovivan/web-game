import {takeEvery, put, call, all, select, take} from 'redux-saga/effects'
import * as actions from '../../../App/actions'


export function* roomJoiningSagaWatcher() {
  yield all([
    takeEvery(actions.SEND_ROOM_CODE, sendRoomCode),
  ])
}

function* sendRoomCode(action: any) {
    const resp = yield call(checkRoomCode)
  switch (resp.type) {
    case "START_GAME" :
      yield put(actions.goToGameActionCreator(action.history))
    break
  }
}

const checkRoomCode = async () => {
  let response = await fetch('/ws/JoinRoom', {method: 'GET'})
  response = await response.json();
  return response
}

  //socket.onmessage = msg => {
  //       const message = JSON.parse(msg.data)
  //       switch (message.type) {
  //         case "START_GAME" :
  //           emitter(actions.goToGameActionCreator(history))
  //           break