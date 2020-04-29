import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Game from './Game'

export const useRoutes = isInRoom => {
    return (
      <Switch>
        <Route exact path = '/' component = {MainMenu}/>
        <Route exact path = '/JoinRoom' component = {JoinRoom}/>
        <Route exact path = '/CreateRoom' component = {CreateRoom}/>
        {isInRoom ? <Route exact path = '/Game' component = {Game}/> : null}
        <Redirect to = '/'/>
      </Switch>
    )
}