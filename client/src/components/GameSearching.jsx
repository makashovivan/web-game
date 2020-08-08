import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import {goToGameActionCreator, goToMenuActionCreator} from '../redux/reducers/root/actions'

const GameSearching = (props) => {
  
  return (
    <div>
      <div> GAMESEARCHING </div>
      <button onClick = {props.goToMenu}>Stop searching</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket, 
  }
}

const mapDispatchToProps = {
  goToGame: goToGameActionCreator, 
  goToMenu: goToMenuActionCreator, 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameSearching))
