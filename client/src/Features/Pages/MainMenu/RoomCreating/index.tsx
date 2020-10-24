import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import {withRouter} from 'react-router-dom'
import {
  goToGameActionCreator, 
  goToMenuActionCreator} from '../../../../App/actions'

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
  goToGame: goToGameActionCreator, 
  goToMenu: goToMenuActionCreator, 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomCreating))
