import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Game from './Game'


const App = () => {

  const [gameAcces, setGameAcces] = useState(false)

  const setAcces = (acces) => {
    console.log("SETACCES TO " + acces.toString().toUpperCase())
    setGameAcces(acces)
  }

  return (
    <div>
      <div>{'Game Acces = ' + gameAcces.toString()}</div>
      <BrowserRouter>
          <Switch>
            <Route exact path = '/' render={() => <MainMenu setGameAcces = {setAcces}/>}/>
            <Route exact path = '/JoinRoom' component = {JoinRoom}/>
            <Route exact path = '/CreateRoom' component = {CreateRoom}/>
            {gameAcces ? <Route exact path = '/Game' component = {Game}/> : null}
            <Redirect to = '/'/>
          </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
