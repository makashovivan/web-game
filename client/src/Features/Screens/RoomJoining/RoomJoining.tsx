import React, {InputHTMLAttributes, useEffect} from 'react'
import {connect} from 'react-redux' 
import {withRouter} from 'react-router-dom'
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'


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

const mapStateToProps = state => {
  return {
    roomCode: state.roomCode,
  }
}

const mapDispatchToProps = {
  sendRoomCode: null,//sendRoomCodeAcrionCreator,
  setRoomCode: null,//setRoomCodeActionCreator,  
}

const roomJoiningToExport = withHistoryUpdate(connect(mapStateToProps, mapDispatchToProps)(RoomJoining))

export {roomJoiningToExport}
