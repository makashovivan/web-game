import React, {InputHTMLAttributes, useEffect} from 'react'
import {connect} from 'react-redux' 
import {withRouter} from 'react-router-dom'
import {
  setRoomCodeActionCreator,
  sendRoomCodeAcrionCreator,
  joinRequestActionCreator} from '../../../App/actions'

const RoomJoining = ({roomCode, sendRoomCode, setRoomCode, history}) => {

  const roomCodeArea = React.createRef<HTMLInputElement>()

  return (
    <div>
      <div>TYPE ROOM CODE HERE</div>
      <input ref = {roomCodeArea} type="text" value = {roomCode} onChange = {() => setRoomCode(roomCodeArea.current.value)}></input>
      <button onClick = {() => sendRoomCode(history)}>RoomJoining</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    roomCode: state.roomCode,
  }
}

const mapDispatchToProps = {
  sendRoomCode: sendRoomCodeAcrionCreator,
  setRoomCode: setRoomCodeActionCreator,  
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomJoining))
