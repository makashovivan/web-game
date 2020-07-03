import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import {goToGameActionCreator, goToMenuActionCreator} from '../redux/reducers/root/actions'

const GameSearching = (props) => {

  const redirectToGame = () => {
    props.goToGame()
    props.history.push('/Game')
  }

  const redirectToMenu = () => {
    props.goToMenu()
  }
  
  useEffect(() => {
    props.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          redirectToGame(props.socket)
          break
      }
    }
  },[])

  return (
    <div>
      <div> GAMESEARCHING </div>
      <button onClick = {redirectToMenu}>Stop searching</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket, 
  }
}

const mapDispatchToProps = {
  goToGame: goToGameActionCreator, 
  goToMenu: goToMenuActionCreator, 
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSearching)
