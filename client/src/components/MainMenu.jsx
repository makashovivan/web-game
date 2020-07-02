import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' 
import { startSearchingActionCreator, startCreatingActionCreator } from '../redux/reducers/rootReducer'

const MainMenu = ({startSearching, startCreating}) => {

  return (
    <div>
      <input type="text"/>
      <button onClick = {() => startSearching()}>Search game</button>
      <button onClick = {() => startCreating()}>Create room</button>
      <Link to = '/JoinRoom'><button>Join room</button></Link>    
    </div>
  )
}

const mapDispatchToProps = {
  startSearching: startSearchingActionCreator,
  startCreating: startCreatingActionCreator,
}

export default connect(null, mapDispatchToProps)(MainMenu)
