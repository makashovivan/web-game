import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {appActions} from '@App'

const MainMenu = ({startSearching, startCreating, history}) => {

  return (
    <div>
      <input type="text"/>
      <button onClick = {() => startSearching('/JoinRoom', history)}>Search game</button>
      <button onClick = {() => startCreating('/JoinRoom', history)}>Create room</button>
      <Link to = '/JoinRoom'>
        <button>Join room</button>
      </Link>    
    </div>
  )
}

const mapDispatchToProps = {
  startSearching: appActions.setPath,
  startCreating: appActions.setPath,
}

const mainMenuToExport = withRouter(connect(null, mapDispatchToProps)(MainMenu))
export {mainMenuToExport}