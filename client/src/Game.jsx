import React, {useEffect} from 'react';
import GameController  from './GameController'

const Game = ({socket}) => {
  
  const canvasRef = React.useRef(null)
  let ctx

  useEffect(() => {
    const canvas =  canvasRef.current
    ctx = canvas.getContext('2d')
    const game = new GameController(socket, ctx)
    game.reDraw()
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
