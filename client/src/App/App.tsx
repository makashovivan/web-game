import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {MainMenu} from '@Features/Screens/MainMenu'
import {RoomJoining} from '@Features/Screens/RoomJoining'
import {Game} from '@Features/Screens/Game'
import {RoomSearching} from '@Features/WaitingWidgets/RoomSearching'
import {RoomCreating} from '@Features/WaitingWidgets/RoomCreating'
import {StateType} from 'Store/rootReducer'


const AppWrapper = styled.div`

`

const App = ({gameAccess, waitingType}) => {

  const waitingWidgetsMap = new Map<string, JSX.Element>(
    [
      ["RoomSearching", <RoomSearching/>],
      ["RoomCreating", <RoomCreating/>],
    ]
  )
  const routes = (
    <AppWrapper>
      <Switch>
        <Route exact path = '/'>
          <MainMenu/>
        </Route>
        <Route exact path = '/JoinRoom'>
          <RoomJoining/>
        </Route>
        {gameAccess &&
          <Route exact path = '/Game'>
            <Game/>
          </Route>}
        <Redirect to = '/'/>
      </Switch>
    </AppWrapper>
  )

  return (
    <div>
      {waitingWidgetsMap.get(waitingType)}
      {routes}
    </div>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    gameAccess: state.app.gameAccess,
    waitingType: state.app.waitingType,
  }
}

export default connect(mapStateToProps)(App)