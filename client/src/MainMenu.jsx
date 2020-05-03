import React from 'react';
import { Link } from 'react-router-dom'


const MainMenu = ({setGameSearching}) => {


  return (
    <div>
      <input type="text"/>
      <Link to = '/CreateRoom'><button>Create room</button></Link>
      <Link to = '/JoinRoom'><button>Join room</button></Link>
      <button onClick = {() => setGameSearching(true) }>Search game</button>
      
    </div>

  )
}

export default MainMenu;
