import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import GameSearching from './GameSearching'

const MainMenu = ({setGameAcces, setSocket, closeSocket}) => {

  const [gameSearching, setGameSearching] = useState(false)
  const history = useHistory()

  const initGameSearching = () => {

    setGameSearching(true)

    const socket = new WebSocket('ws://localhost:8000/ws') // INIT WS CONNECTION
    socket.onmessage = message => {
      console.log(message.data + ' INIT_HANDLER')
      if (message.data == "START_GAME") {
        socket.onmessage = null
        setGameAcces(true)
        setGameSearching(false)
        setSocket(socket)
        history.push('/Game')
      }
    }

  }


  useEffect(() => {
    setGameAcces(false)
    closeSocket()
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
