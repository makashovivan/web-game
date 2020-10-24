import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect, Switch} from 'react-router-dom'
import MainMenu from '../Features/Pages/MainMenu/index'
import RoomJoining from '../Features/Pages/RoomJoining/index'
import Game from '../Features/Pages/Game/index'
import RoomSearching from '../Features/Pages/MainMenu/RoomSearching'
import RoomCreating from '../Features/Pages/MainMenu/RoomCreating'
import ModalWindow from '../Common/Components/ModalWindow'
import {AppStateType} from '../store'
import './App.css'

const App: React.FC = () => {

  const state: AppStateType = useSelector<AppStateType, AppStateType>(state => state)

  return (
    <div>
      {/* {state.error.render && <ModalWindow/>} */}
      {state.main.waitingType === "RoomSearching" && <RoomSearching/>}
      {state.main.waitingType === "RoomCreating" && <RoomCreating/>}

      <div>{'State = ' + JSON.stringify(state)}</div> 
      <div>{'Game Acces = ' + state.main.gameAcces}</div> 

      <Switch>
        <Route exact path = '/'>
          <MainMenu/>
        </Route>
        <Route exact path = '/JoinRoom'>
          <RoomJoining/>
        </Route>
        {state.main.gameAcces && <Route exact path = '/Game' render = {() => <Game/>} />}
        <Redirect to = '/'/>
      </Switch>
    </div>
  )
}

export default App
