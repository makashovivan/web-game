import React, {useEffect, useState} from 'react';
import {goToGameActionCreator, goToMenuActionCreator} from './redux/reducers/rootReducer'

const GameCreating = ({history, dispatch, state}) => {

  const goToGame = () => {
    dispatch(goToGameActionCreator())
    history.push('/Game')
  }

  const goToMenu = () => {
    dispatch(goToMenuActionCreator())
  }

  const startCreating = () => {

    state.socket.onopen = () => {                                          
      state.socket.send(JSON.stringify({type: 'ROOM_CODE', payload: state.roomCode }))
    }

    state.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          goToGame()
          break
      }
  
    }
  }

  useEffect(() => {
    startCreating()
  },[])

  return (
    <div>
      <div>GAMECREATING</div>
      <div>{state.roomCode}</div>
      <button onClick = {goToMenu}>Stop Creating</button>
    </div>

  )
}

export default GameCreating;
