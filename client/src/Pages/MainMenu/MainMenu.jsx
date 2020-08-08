import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 
import { searchingRequestActionCreator, creatingRequestActionCreator } from '../../redux/reducers/root/actions'
import { withRouter } from 'react-router-dom'

const MainMenu = ({startSearching, startCreating, history}) => {

  return (
    <div>
      <input type="text"/>
      <button onClick = {() => startSearching(history)}>Search game</button>
      <button onClick = {() => startCreating(history)}>Create room</button>
      <Link to = '/JoinRoom'><button>Join room</button></Link>    
    </div>
  )
}

const mapDispatchToProps = {
  startSearching: searchingRequestActionCreator,
  startCreating: creatingRequestActionCreator,
}

export default withRouter(connect(null, mapDispatchToProps)(MainMenu))
