import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux' 

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
  //goToMenu: goToMenuActionCreator, 
}

const roomSearchingToExport = withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomSearching))

export {roomSearchingToExport}
