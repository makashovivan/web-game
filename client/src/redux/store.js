import createSagaMiddleware from 'redux-saga'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers/root/rootReducer'
import errorsReducer from './reducers/errors/errorsReducer'
import {rootSagaWatcher} from './sagas/root.Saga'

const combineReducersWithRoot = (rootReducer, reducers) => {
  return (state, action) => {
    // Ensure the root state object is a new object; otherwise
    // React may not re-render.
    let newState = {...rootReducer(state, action)};
    Object.keys(reducers).forEach(domain => {
      let obj = state ? state[domain] : undefined;
      newState[domain] = reducers[domain](obj, action);
    });
    return newState
  }
}

const saga = createSagaMiddleware()

let store = createStore(combineReducersWithRoot(rootReducer, {error: errorsReducer}), compose(
  applyMiddleware(saga)
))

saga.run(rootSagaWatcher)

export default store