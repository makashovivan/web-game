import React, { useEffect } from 'react';
import {goToGameActionCreator, goToMenuActionCreator} from '../redux/reducers/rootReducer'




const GameSearching = ({history, dispatch, state}) => {


  const goToGame = () => {
    dispatch(goToGameActionCreator())
    history.push('/Game')
  }

  const goToMenu = () => {
    dispatch(goToMenuActionCreator())
  }
  

  useEffect(() => {
    // state.socket.onopen = () => {
    //   state.socket.send(JSON.stringify({type: "SEARCH_GAME", payload: ''}))
    // }

    state.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          goToGame(state.socket)
          break
      }

    }
  },[])


  return (
    <div>
      <div> GAMESEARCHING </div>
      <button onClick = {goToMenu}>Stop searching</button>
    </div>

  )
}

export default GameSearching;
