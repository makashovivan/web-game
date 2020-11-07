import React, {InputHTMLAttributes, useEffect} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux' 
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'
import {StateType} from 'rootReducer'

const RoomJoining = ({roomCode, sendRoomCode, setRoomCode}) => {

  const roomCodeArea = React.createRef<HTMLInputElement>()

  return (
    <div>
      <div>TYPE ROOM CODE HERE</div>
      <input ref = {roomCodeArea} type="text" value = {roomCode} onChange = {() => setRoomCode(roomCodeArea.current.value)}></input>
      <button onClick = {() => {}}>RoomJoining</button>
    </div>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    roomCode: state,
  }
}

const mapDispatchToProps = {
  sendRoomCode: null,//sendRoomCodeAcrionCreator,
  setRoomCode: null,//setRoomCodeActionCreator,  
}

export default compose(
  withHistoryUpdate,
  connect(mapStateToProps, mapDispatchToProps)
)(RoomJoining)

