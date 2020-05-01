import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import GameSearching from './GameSearching'

const MainMenu = ({setGameAcces}) => {

  const [gameSearching, setGameSearching] = useState(false)
  const history = useHistory()
  let socket

  const initGameSearching = () => {

    setGameSearching(true)

    socket = new WebSocket('ws://localhost:8000/ws') // INIT WS CONNECTION
    socket.onmessage = message => {
      console.log(message)
      if (message.data == "START_GAME") {
        setGameAcces(true)
        setGameSearching(false)
        history.push('/Game')
      }
    }

  }


  useEffect(() => {
    setGameAcces(false)
  },[])

  return (
    <div>
      {gameSearching ? <GameSearching/> : null}
      <input type="text"/>
      <Link to = '/CreateRoom'><button>Create room</button></Link>
      <Link to = '/JoinRoom'><button>Join room</button></Link>
      <button onClick = {() => initGameSearching() }>Search game</button>
      
    </div>

  )
}

export default MainMenu;
