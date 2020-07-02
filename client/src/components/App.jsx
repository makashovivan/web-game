import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import Game from './Game'
import GameSearching from './GameSearching'
import GameCreating from './GameCreating'
import Error from './Error'
import './App.css'

const App = () => {

  const state = useSelector(state => state)
  let history = useHistory()

  return (
    <div>
      {state.error.render && <Error/>}
      {state.gameSearching && <GameSearching history = {history} /> }
      {state.gameCreating && <GameCreating history = {history} />}

      <div>{'Game Acces = ' + state.gameAcces.toString()}</div> 

      <Switch>
        <Route exact path = '/'>
          <MainMenu/>
        </Route>
        <Route exact path = '/JoinRoom'>
          <JoinRoom history = {history}/>
        </Route>
        {state.gameAcces && <Route exact path = '/Game' render = {() => <Game/>} />}
        <Redirect to = '/'/>
      </Switch>
    </div>
  )
}

export default App
