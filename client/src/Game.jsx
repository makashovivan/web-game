import React, {useEffect} from 'react';
import GameController  from './GameController'
import { useHistory }  from 'react-router-dom'

const Game = ({ socket, setGameAcces, setModalWindow }) => {

  const history = useHistory()
  const canvasRef = React.useRef(null)
  let ctx

  const onOpponentLeave = () => {
    console.log("Opponent Leaved")
    history.push('/')
    setModalWindow({rendered : true, type: "ERROR", text: "OPPONENT LEAVED THE GAME"})
    // OPPONENT LEAVED ERROR
  }

  useEffect(() => {
    const canvas =  canvasRef.current
    ctx = canvas.getContext('2d')
    const game = new GameController(socket, ctx, onOpponentLeave)
    const keyboardHandler = (event) => {
      game.onKeyPress(event)
    }
    document.addEventListener('keydown', keyboardHandler)
    game.initDrawing()
    return () => {
      console.log("GAMEUNMOUNT")
      document.removeEventListener('keydown',  keyboardHandler)
      socket.close()
      game.stopDrawing()
      setGameAcces(false)
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
