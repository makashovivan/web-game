import React, { useEffect } from 'react';
import { useHistory }  from 'react-router-dom'


const GameSearching = ({setGameAcces, setSocket, setGameSearching}) => {

  const history = useHistory()
  let socket

  useEffect(() => {
    socket = new WebSocket('ws://localhost:8000/ws') // INIT WS CONNECTION
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
  },[])


  return (
    <div>
      <div> GameSearching </div>
      <button onClick = {() => {
        socket.close()
        socket.onmessage = null
        setSocket(null)
        setGameAcces(false)
        setGameSearching(false)
      }}>Stop searching</button>
    </div>

  )
}

export default GameSearching;
