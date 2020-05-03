import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Game from './Game'
import GameSearching from './GameSearching'


const App = () => {

  const [socket, setSocket] = useState(null)
  const [gameAcces, setGameAcces] = useState(false)
  const [gameSearching, setGameSearching] = useState(false)


  return (
    <BrowserRouter>
    {gameSearching ? <GameSearching setGameAcces = {setGameAcces} setSocket = {setSocket} setGameSearching = {setGameSearching}/> : null}
      <div>{'Game Acces = ' + gameAcces.toString()}</div> 
          <Switch>
            <Route exact path = '/' render={() => <MainMenu setGameSearching = {setGameSearching}/>}/>
            <Route exact path = '/JoinRoom' component = {JoinRoom}/>
            <Route exact path = '/CreateRoom' component = {CreateRoom}/>
            {gameAcces ? <Route exact path = '/Game' render={() => <Game socket = {socket} setGameAcces = {setGameAcces}/>}/> : null}
            <Redirect to = '/'/>
          </Switch>
    </BrowserRouter>
  )
}

export default App;
