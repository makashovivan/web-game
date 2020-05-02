import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Game from './Game'


const App = () => {

  const [socket, setSocket] = useState(null)
  const [gameAcces, setGameAcces] = useState(false)

  const closeSocket = () => {
    if (socket) {
      socket.close()
      setSocket(null)
      console.log('socket nulled')
    }
  }


  return (
    <div>
      <div>{'Game Acces = ' + gameAcces.toString()}</div>
      <BrowserRouter>
          <Switch>
            <Route exact path = '/' render={() => <MainMenu setGameAcces = {setGameAcces} setSocket = {setSocket} closeSocket = {closeSocket}/>}/>
            <Route exact path = '/JoinRoom' component = {JoinRoom}/>
            <Route exact path = '/CreateRoom' component = {CreateRoom}/>
            {gameAcces ? <Route exact path = '/Game' render={() => <Game socket = {socket}/>}/> : null}
            <Redirect to = '/'/>
          </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
