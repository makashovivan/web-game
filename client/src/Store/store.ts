import {createStore, compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'


const sagaMiddleware = createSagaMiddleware()

const middlewares = compose(
  applyMiddleware(sagaMiddleware),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  rootReducer,
  middlewares,
 )

 sagaMiddleware.run(rootSaga)

export default store
