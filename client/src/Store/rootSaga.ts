import {all} from 'redux-saga/effects'
import {appSagaWatcher} from '../App/AppSagas'
import {roomSearchingSagaWatcher} from '@Features/WaitingWidgets/RoomSearching/RoomSearchingSagas'
import {roomCreatingSagaWatcher} from '@Features/WaitingWidgets/RoomCreating/RoomCreatingSagas'
import {roomJoiningSagaWatcher} from '@Features/Screens/RoomJoining/RoomJoiningSagas'
import {mainMenuSagaWatcher} from '@Features/Screens/MainMenu/MainMenuSagas'
import {gameSagaWatcher} from '@Features/Screens/Game/GameSagas'

export default function* rootSaga() {
  yield all([
    appSagaWatcher(),
    mainMenuSagaWatcher(),
    gameSagaWatcher(),
    roomSearchingSagaWatcher(),
    roomCreatingSagaWatcher(),
    roomJoiningSagaWatcher(),
  ])
}
