import React, {useEffect} from 'react';
import GameController  from './GameController'
import { useHistory } from 'react-router-dom';
import { opponentLeavedActionCreator } from '../redux/reducers/errorsReducer'
import { gameUnmountActionCreator } from '../redux/reducers/rootReducer'

  const Game = ({ dispatch, state }) => {

  const history = useHistory()
  const canvasRef = React.useRef(null)
  let ctx

  const onOpponentLeave = () => {
    console.log("Opponent Leaved")
    history.push('/')
    dispatch(opponentLeavedActionCreator())
  }

  useEffect(() => {
    const canvas =  canvasRef.current
    ctx = canvas.getContext('2d')
    const game = new GameController(state.socket, ctx, onOpponentLeave)
    const keyboardHandler = (event) => {
      game.onKeyPress(event)
    }
    document.addEventListener('keydown', keyboardHandler)
    game.initDrawing()
    return () => {
      console.log("GAMEUNMOUNT")
      document.removeEventListener('keydown',  keyboardHandler)
      game.stopDrawing()
      dispatch(gameUnmountActionCreator())
    }
  },[])



  return (
    <div>
      <canvas ref =  {canvasRef}
							width = {'1000px'}
							height= {'400px'}
							tabIndex={1}>
      </canvas>
    </div>

  )
}

export default Game;
