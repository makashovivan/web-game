import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import GameController  from './GameController'
import {opponentLeavedActionCreator} from '@Common/Widgets/Errors/reducer'
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'
import {StateType} from 'Store/rootReducer'

  const Game = (props) => {

  const canvasRef = React.useRef(null)
  let ctx

  // const onOpponentLeave = () => {
  //   console.log("Opponent Leaved")
  //   history.push('/')
  //   props.opponentLeaved()
  // }

  useEffect(() => {
    console.log("ONGAMEMOUNT")
    // const canvas =  canvasRef.current
    // ctx = canvas.getContext('2d')
    // const game = new GameController(props.socket, ctx, onOpponentLeave)
    // const keyboardHandler = (event) => {
    //   game.onKeyPress(event)
    // }
    // document.addEventListener('keydown', keyboardHandler)
    // game.initDrawing()
    // return () => {
    //   console.log("GAMEUNMOUNT")
    //   document.removeEventListener('keydown',  keyboardHandler)
    //   game.stopDrawing()
    //   props.gameUnmount()
    // }
  },[])

  // if (!props.gameAccess) {
  //   return <Redirect to = '/'/>
  // }

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

const mapStateToProps = (state: StateType) => {
  return {
    gameAccess: state.app.gameAccess
  }
}

const mapDispatchToProps = {
  opponentLeaved: opponentLeavedActionCreator, 
  gameUnmount: null,//goToMenuActionCreator, 
}

export default compose(
  withHistoryUpdate,
  connect(mapStateToProps, mapDispatchToProps)
)(Game)

