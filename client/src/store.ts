import createSagaMiddleware from 'redux-saga'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import appReducer from './App/AppReducer'
import errorsReducer from '@Common/Widgets/Errors/reducer'
import {appSagaWatcher} from './App/AppSagas'
import {roomSearchingSagaWatcher} from './Features/WaitingWidgets/RoomSearching/RoomSearchingSagas'
import {roomCreatingSagaWatcher} from './Features/WaitingWidgets/RoomCreating/RoomCreatingSagas'
import {roomJoiningSagaWatcher} from './Features/Screens/RoomJoining/RoomJoiningSagas'
import mainMenuReducer from '@Features/Screens/MainMenu/MainMenuReducer'
import roomSearchingReducer from '@Features/WaitingWidgets/RoomSearching/RoomSearchingReducer'
import { mainMenuSagaWatcher } from '@Features/Screens/MainMenu/MainMenuSagas'
import { gameSagaWatcher } from '@Features/Screens/Game/GameSagas'

const rootReducer = combineReducers({
  main: appReducer,
  errors: errorsReducer,
  mainMenu: mainMenuReducer,
  roomSearching: roomSearchingReducer,

})

export type AppStateType = ReturnType<typeof rootReducer>

const saga = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(applyMiddleware(saga))
 )
saga.run(appSagaWatcher)
saga.run(roomSearchingSagaWatcher)
saga.run(roomCreatingSagaWatcher)
saga.run(roomJoiningSagaWatcher)
saga.run(mainMenuSagaWatcher)
saga.run(gameSagaWatcher)

export type InferActions<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

export type InferActionsTypes<T> = T extends {type: infer U} ? U : never

export type InferActionFromActions<A, T extends InferActionsTypes<A>> = A extends {type: infer U} ? U extends T ? A : never : never

export default store
