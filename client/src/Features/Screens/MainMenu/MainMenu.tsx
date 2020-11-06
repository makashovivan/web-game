import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
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

const mainMenuToExport = withHistoryUpdate(connect(null, mapDispatchToProps)(MainMenu))
export {mainMenuToExport}