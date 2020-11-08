import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import {App} from '@App'
import store from './Store/store'
import './index.css'

const app: JSX.Element = (
  <Provider store = {store}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)

render(app, document.getElementById('root'))

serviceWorker.unregister()
