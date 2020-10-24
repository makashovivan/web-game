import createSagaMiddleware from 'redux-saga'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import mainReducer from './App/reducer'
import errorsReducer from './Features/Errors/reducer'
import {rootSagaWatcher} from './App/sagas'
import {roomSearchingSagaWatcher} from './Features/Pages/MainMenu/RoomSearching/sagas'
import {roomCreatingSagaWatcher} from './Features/Pages/MainMenu/RoomCreating/sagas'
import {roomJoiningSagaWatcher} from './Features/Pages/RoomJoining/sagas'

const rootReducer = combineReducers({
  main: mainReducer,
  errors: errorsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

const saga = createSagaMiddleware()

const store = createStore(
  rootReducer,
  compose(applyMiddleware(saga))
 )
saga.run(rootSagaWatcher)
saga.run(roomSearchingSagaWatcher)
saga.run(roomCreatingSagaWatcher)
saga.run(roomJoiningSagaWatcher)

export type InferActions<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

export type InferActionsTypes<T> = T extends {type: infer U} ? U : never

export type InferActionFromActions<A, T extends InferActionsTypes<A>> = A extends {type: infer U} ? U extends T ? A : never : never

export default store
