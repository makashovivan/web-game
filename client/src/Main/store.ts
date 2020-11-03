import createSagaMiddleware from 'redux-saga'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import appReducer from '../App/reducer'
import errorsReducer from '@Common/Widgets/Errors/reducer'
import {appSagaWatcher} from '../App/sagas'
import {roomSearchingSagaWatcher} from '../Features/Screens/MainMenu/RoomSearching/sagas'
import {roomCreatingSagaWatcher} from '../Features/Screens/MainMenu/RoomCreating/sagas'
import {roomJoiningSagaWatcher} from '../Features/Screens/RoomJoining/sagas'

const rootReducer = combineReducers({
  main: appReducer,
  errors: errorsReducer,
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

export type InferActions<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

export type InferActionsTypes<T> = T extends {type: infer U} ? U : never

export type InferActionFromActions<A, T extends InferActionsTypes<A>> = A extends {type: infer U} ? U extends T ? A : never : never

export default store
