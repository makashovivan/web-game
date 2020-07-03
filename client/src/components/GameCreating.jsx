import React, { useEffect } from 'react'
import { connect } from 'react-redux' 
import { goToGameActionCreator, goToMenuActionCreator } from '../redux/reducers/root/actions'

const GameCreating = (props) => {

  const redirectToGame = () => {
    props.goToGame()
    props.history.push('/Game')
  }

  const redirectToMenu = () => {
    props.goToMenu()
  }

  const startCreating = () => {
    props.socket.onopen = () => {                                          
      props.socket.send(JSON.stringify({type: 'ROOM_CODE', payload: props.roomCode }))
    }
    props.socket.onmessage = msg => {
      const message = JSON.parse(msg.data)
      switch (message.type) {
        case "START_GAME" :
          redirectToGame()
          break
      }
    }
  }

  useEffect(() => {
    startCreating()
  },[])
  
  return (
    <div>
      <div>GAMECREATING</div>
      <div>{props.roomCode}</div>
      <button onClick = {redirectToMenu}>Stop Creating</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomCode: state.roomCode,
  }
}

const mapDispatchToProps = {
  goToGame: goToGameActionCreator, 
  goToMenu: goToMenuActionCreator, 
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCreating)
