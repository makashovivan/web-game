import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {actions} from '../../../App/reducer'

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
  startSearching: actions.setPath,
  startCreating: actions.setPath,
}

export default withRouter(connect(null, mapDispatchToProps)(MainMenu))
