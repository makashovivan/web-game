import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import {StateType} from 'rootReducer'

const RoomCreating = (props) => {
  
  return (
    <div>
      <div>RoomCREATING</div>
      <div>{props.roomCode}</div>
      <button onClick = {props.goToMenu}>Stop Creating</button>
    </div>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    socket: state,
    roomCode: state,
  }
}

const mapDispatchToProps = {
  goToGame: null,//goToGameActionCreator, 
  goToMenu: null,//goToMenuActionCreator, 
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreating)

