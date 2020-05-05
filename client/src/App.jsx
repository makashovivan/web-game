import React, {useState} from 'react';
import './App.css';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Game from './Game'
import GameSearching from './GameSearching'
import ModalWindow from './ModalWindow'


const App = () => {

  const history = useHistory()

  const [socket, setSocket] = useState(null)
  const [gameAcces, setGameAcces] = useState(false)
  const [gameSearching, setGameSearching] = useState(false)
  const [modalWindow, setModalWindow] = useState({rendered: false})

  const closeConnection = () => {
    if (socket) {socket.close()}
  }


  return (
    <div>
    {modalWindow.rendered ? <ModalWindow type = {modalWindow.type}
     text = {modalWindow.text} onExit = {() => setModalWindow({rendered: false})}/>
    : null}
    {gameSearching ? <GameSearching setGameAcces = {setGameAcces}
                      setSocket = {setSocket} setGameSearching = {setGameSearching}
                      history = {history} closeConnection = {closeConnection}/> 
    : null}
      <div>{'Game Acces = ' + gameAcces.toString()}</div> 
          <Switch>
            <Route exact path = '/' render={() => <MainMenu setGameSearching = {setGameSearching}/>}/>
            <Route exact path = '/JoinRoom' component = {JoinRoom}/>
            <Route exact path = '/CreateRoom' component = {CreateRoom}/>
            {gameAcces ? <Route exact path = '/Game' render={() => <Game socket = {socket} setGameAcces = {setGameAcces}
                                                                         setModalWindow = {setModalWindow}/>}/>
             : null}
            <Redirect to = '/'/>
          </Switch>
    </div>
  )
}

export default App;
