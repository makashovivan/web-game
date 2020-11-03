import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect, Switch} from 'react-router-dom'
import {MainMenu} from '@Features/Screens/MainMenu'
import {RoomJoining} from '@Features/Screens/RoomJoining'
import {Game} from '@Features/Screens/Game'
import {RoomSearching} from '@Features/WaitingWidgets/RoomSearching'
import {RoomCreating} from '@Features/WaitingWidgets/RoomCreating'
import ModalWindow from '@Common/Components/ModalWindow'
import {AppStateType} from '@Store'
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

export {App}