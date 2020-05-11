import React from 'react';
import { Link } from 'react-router-dom'
import { startSearchingActionCreator, startCreatingActionCreator } from '../redux/reducers/rootReducer'


const MainMenu = ({dispatch}) => {


  return (
    <div>
      <input type="text"/>
      <button onClick = {() => dispatch(startSearchingActionCreator()) }>Search game</button>
      <button onClick = {() => dispatch(startCreatingActionCreator()) }>Create room</button>
      <Link to = '/JoinRoom'><button>Join room</button></Link>

      
    </div>

  )
}

export default MainMenu;
