import React, { useEffect } from 'react';
import ModalWindow from './ModalWindow'



const GameSearching = ({setGameAcces, setSocket, setGameSearching, history, closeConnection}) => {

  //let socket

  const goToGame = (socket) => {
    setGameAcces(true)
    setGameSearching(false)
    setSocket(socket)
    history.push('/Game')
  }

  const goToMenu = () => {
    closeConnection()
    setSocket(null)
    setGameAcces(false)
    setGameSearching(false)
  }
  
  const startSearching = () => {
    const socket = new WebSocket('ws://localhost:8000/ws')              // INIT WS CONNECTION
    setSocket(socket)

    socket.onopen = () => {                                             // SET CONNECTION MODE
      socket.send(JSON.stringify({type: "SEARCH_GAME", payload: ''}))
    }

    socket.onmessage = msg => {                                         // MESSAGE HANDLING IN SEARCHING STAGE
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          goToGame(socket)
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
      <ModalWindow type = {"SEARCHING"} text = {"Searching for free player"}  onExit = {goToMenu}/>
      {/* <button onClick = {goToMenu}>Stop searching</button> */}
    </div>

  )
}

export default GameSearching;
