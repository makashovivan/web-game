import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store'


const rerenderTree = state => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App state = {state} store = {store}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerenderTree(store.getState())

store.subscribe(() => {
  rerenderTree(store.getState())
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
