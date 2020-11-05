import React, {useEffect} from 'react'
import {connect} from 'react-redux' 
import {useHistory} from 'react-router-dom'
import GameController  from './GameController'
import {opponentLeavedActionCreator} from '@Common/Widgets/Errors/reducer'

  const Game = (props) => {

  const history = useHistory()
  const canvasRef = React.useRef(null)
  let ctx

  const onOpponentLeave = () => {
    console.log("Opponent Leaved")
    history.push('/')
    props.opponentLeaved()
  }

  useEffect(() => {
    const canvas =  canvasRef.current
    ctx = canvas.getContext('2d')
    const game = new GameController(props.socket, ctx, onOpponentLeave)
    const keyboardHandler = (event) => {
      game.onKeyPress(event)
    }
    document.addEventListener('keydown', keyboardHandler)
    game.initDrawing()
    return () => {
      console.log("GAMEUNMOUNT")
      document.removeEventListener('keydown',  keyboardHandler)
      game.stopDrawing()
      props.gameUnmount()
    }
  },[])

  return (
    <div>
      <div>GAME</div>
      <canvas ref =  {canvasRef}
							width = {'1000px'}
							height= {'400px'}
							tabIndex={1}>
      </canvas>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socket: state.socket, 
  }
}

const mapDispatchToProps = {
  opponentLeaved: opponentLeavedActionCreator, 
  gameUnmount: null,//goToMenuActionCreator, 
}

export const gameToExport = connect(mapStateToProps, mapDispatchToProps)(Game)
