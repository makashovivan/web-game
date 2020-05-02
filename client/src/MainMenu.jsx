import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import GameSearching from './GameSearching'

const MainMenu = ({setGameAcces, setSocket}) => {

  const [gameSearching, setGameSearching] = useState(false)



  useEffect(() => {
    setGameAcces(false)
  },[])

  return (
    <div>
      {gameSearching ? <GameSearching setGameAcces = {setGameAcces}
                                      setSocket = {setSocket} 
                                      setGameSearching = {setGameSearching}/> : null}
      <input type="text"/>
      <Link to = '/CreateRoom'><button>Create room</button></Link>
      <Link to = '/JoinRoom'><button>Join room</button></Link>
      <button onClick = {() => setGameSearching(true) }>Search game</button>
      
    </div>

  )
}

export default MainMenu;
