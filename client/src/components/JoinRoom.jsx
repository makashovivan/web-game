import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import {goToGameActionCreator, joinRequestActionCreator, changeRoomCodeActionCreator} from '../redux/reducers/rootReducer'

const JoinRoom = (props) => {

  const roomCodeArea = React.createRef()

  const goToGame = () => {
    props.goToGame()
    props.history.push('/Game')
  }

  const sendRoomCode = () => {
    props.socket.send(JSON.stringify({type: 'ROOM_CODE', payload: props.roomCode}))
  }

  useEffect(() => {
    props.joinRequest()
    props.socket.onmessage = msg => {
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
      <input ref = {roomCodeArea} type="text" value = {props.roomCode} onChange = {() => props.changeRoomCode(roomCodeArea.current.value)}></input>
      <button onClick = {() => sendRoomCode()}>JoinRoom</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket, 
    roomCode: state.roomCode,
  }
}

const mapDispatchToProps = {
  goToGame: goToGameActionCreator, 
  joinRequest: joinRequestActionCreator,
  changeRoomCode: changeRoomCodeActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
