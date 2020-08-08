import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import { withRouter } from 'react-router-dom'
import { goToGameActionCreator, goToMenuActionCreator } from '../redux/reducers/root/actions'

const GameCreating = (props) => {
  
  return (
    <div>
      <div>GAMECREATING</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameCreating))
