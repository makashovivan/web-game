import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {mainMenuActions} from './MainMenuReducer'
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'

const MainMenu = ({initRoomSearching, initRoomCreating}) => {

  return (
    <div>
      <input type="text"/>
      <button onClick = {() => initRoomSearching()}>Search game</button>
      <button onClick = {() => initRoomCreating()}>Create room</button>
      <Link to = '/JoinRoom'>
        <button>Join room</button>
      </Link>    
    </div>
  )
}

const mapDispatchToProps = {
  initRoomSearching: mainMenuActions.initRoomSearching,
  initRoomCreating: mainMenuActions.initRoomCreating,
}

export default compose(
  withHistoryUpdate,
  connect(null, mapDispatchToProps)
)(MainMenu)
