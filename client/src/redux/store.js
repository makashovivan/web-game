import { createStore, combineReducers } from 'redux'
import rootReducer from './reducers/rootReducer'
import errorsReducer from './reducers/errorsReducer'

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

let store = createStore(combineReducersWithRoot(rootReducer, {error: errorsReducer}))

export default store