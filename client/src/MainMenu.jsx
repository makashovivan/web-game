import React from 'react';
import {Link} from 'react-router-dom'

const MainMenu = () => {
  return (
    <div>

      <input type="text"/>
      <Link to = '/CreateRoom'><button>Create room</button></Link>
      <Link to = '/JoinRoom'><button>Join room</button></Link>
      <Link to = '/Game'><button>Search game</button></Link>
      
    </div>

  )
}

export default MainMenu;
