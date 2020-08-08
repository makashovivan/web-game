import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import MainMenu from '../../Pages/MainMenu/MainMenu'
import JoinRoom from '../../Pages/JoinRoom/JoinRoom'
import Game from '../../Pages/Game/Game'
import GameSearching from '../GameSearching'
import GameCreating from '../GameCreating'
import ModalWindow from '../ModalWindow'
import './App.css'

const App = () => {

  const state = useSelector(state => state)

  return (
    <div>
      {state.error.render && <ModalWindow/>}
      {state.gameSearching && <GameSearching/>}
      {state.gameCreating && <GameCreating/>}

      <div>{'Game Acces = ' + state.gameAcces.toString()}</div> 

      <Switch>
        <Route exact path = '/'>
          <MainMenu/>
        </Route>
        <Route exact path = '/JoinRoom'>
          <JoinRoom/>
        </Route>
        {state.gameAcces && <Route exact path = '/Game' render = {() => <Game/>} />}
        <Redirect to = '/'/>
      </Switch>
    </div>
  )
}

export default App
