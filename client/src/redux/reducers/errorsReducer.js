const OPPONENT_LEAVED_ERROR = 'OPPONENT_LEAVED_ERROR'
const CLOSE_ERROR = 'CLOSE_ERROR'

let initialState = {
  render: false,
  type: '',
  text: '',
}

const errorsReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'CLOSE_ERROR':
      state.render = false
      return state

    case 'OPPONENT_LEAVED_ERROR':
      state.render = true
      state.type = 'OPPONENT_LEAVED_THE_GAME'
      state.text = 'sorry, your opponent leaved, you can find new game' 
      return state
    
    default:
      return state
    }
}

export const closeErrorActionCreator = () => ({type: CLOSE_ERROR})
export const opponentLeavedActionCreator = () => ({type: OPPONENT_LEAVED_ERROR})

export default errorsReducer