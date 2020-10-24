import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux' 
import {goToMenuActionCreator} from '../../../../App/actions'

const RoomSearching = (props) => {
  return (
    <div>
      <div> RoomSEARCHING </div>
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
  goToMenu: goToMenuActionCreator, 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomSearching))
