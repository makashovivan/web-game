import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import {withRouter} from 'react-router-dom'

const RoomCreating = (props) => {
  
  return (
    <div>
      <div>RoomCREATING</div>
      <div>{props.roomCode}</div>
      <button onClick = {props.goToMenu}>Stop Creating</button>
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
  goToGame: null,//goToGameActionCreator, 
  goToMenu: null,//goToMenuActionCreator, 
}

const roomCreatingToExport = withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomCreating))

export {roomCreatingToExport}
