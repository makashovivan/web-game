import* as actions from './actions'

let initialState = {
  gameAcces: false,
  gameSearching: false,
  gameCreating: false,
  roomCode: null,
  socket: null,
}


const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case actions.SET_SOCKET: 
      console.log(actions.SET_SOCKET)
      console.log('SOCKET: ' + action.socket)
      return {...state, socket: action.socket}
    
    case actions.SET_GAME_ACCES:
      console.log(actions.SET_GAME_ACCES)
      return {...state, gameAcces: action.gameAcces}

    case actions.SET_GAME_SEARCHING:
      console.log(actions.SET_GAME_SEARCHING)
      return {...state, gameSearching: action.gameSearching}
    
    case actions.SET_GAME_CREATING:
      console.log(actions.SET_GAME_CREATING)
      return {...state, gameCreating: action.gameCreating}
    
    case actions.SET_ROOM_CODE:
      console.log(actions.SET_ROOM_CODE)
      return {...state, roomCode: action.roomCode}

    default: 
      return {...state} 
  }
}

export default rootReducer