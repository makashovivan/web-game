import React, { useEffect } from 'react';
import { useHistory }  from 'react-router-dom'



const GameSearching = ({setGameAcces, setSocket, setGameSearching}) => {

  const history = useHistory()
  let socket

  const goToGame = () => {
    setGameAcces(true)
    setGameSearching(false)
    setSocket(socket)
    history.push('/Game')
  }

  const goToMenu = () => {
    socket.close()
    setSocket(null)
    setGameAcces(false)
    setGameSearching(false)
  }
  
  const startSearching = () => {
    socket = new WebSocket('ws://localhost:8000/ws') // INIT WS CONNECTION
    socket.onmessage = msg => {                      // MESSAGE HANDLING IN SEARCHING STAGE
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          goToGame()
          break
      }
  
    }
  }


  useEffect(() => {
    startSearching()
  },[])


  return (
    <div>
      <div> GameSearching </div>
      <button onClick = {goToMenu}>Stop searching</button>
    </div>

  )
}

export default GameSearching;
