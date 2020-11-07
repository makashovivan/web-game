import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {StateType} from 'rootReducer'

const RoomSearching = (props) => {
  return (
    <div>
      <div> RoomSEARCHING </div>
      <button onClick = {props.goToMenu}>Stop searching</button>
    </div>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    socket: state, 
  }
}

const mapDispatchToProps = {
  //goToMenu: goToMenuActionCreator, 
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSearching)