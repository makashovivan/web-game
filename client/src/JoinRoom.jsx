import React, {useState, useEffect} from 'react'
import {goToGameActionCreator, joinRequestActionCreator, changeRoomCodeActionCreator} from './redux/reducers/rootReducer'

const JoinRoom = ({history, dispatch, state}) => {

  const roomCodeArea = React.createRef()


  const goToGame = () => {
    dispatch(goToGameActionCreator())
    history.push('/Game')
  }

  const sendRoomCode = () => {
    state.socket.send(JSON.stringify({type: 'ROOM_CODE', payload: state.roomCode}))
  }



  useEffect(() => {

    dispatch(joinRequestActionCreator())

    state.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)

      switch (message.type) {
        case "START_GAME" :
          goToGame()
          break
      }
  
    }
  },[])




  return (
    <div>
      <div>TYPE ROOM CODE HERE</div>
      <input ref = {roomCodeArea} type="text" value = {state.roomCode} onChange = {() => dispatch(changeRoomCodeActionCreator(roomCodeArea.current.value))}></input>
      <button onClick = {() => sendRoomCode()}>JoinRoom</button>
    </div>

  )
}

export default JoinRoom;
