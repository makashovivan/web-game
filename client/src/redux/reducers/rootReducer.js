const GO_TO_GAME = 'GO_TO_GAME'
const GO_TO_MENU = 'GO_TO_MENU'

const GAME_UNMOUNT = 'GAME_UNMOUNT'

const START_CREATING = 'START_CREATING'
const START_SEARCHING = 'START_SEARCHING'
const JOIN_REQUEST = 'JOIN_REQUEST'

const CHANGE_ROOM_CODE = 'CHANGE_ROOM_CODE'



let initialState = {
  gameAcces: false,
  gameSearching: false,
  gameCreating: false,
  roomCode: null,
  socket: null,
}


const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'GAME_UNMOUNT':
      state.roomCode = null
      state.gameAcces = false
      state.socket.close()
      return state


    case 'GO_TO_GAME':
      state.gameAcces = true
      state.gameSearching = false
      state.gameCreating = false
      return state

    case 'GO_TO_MENU':
      if (state.socket !== null) state.socket.close()
      state.socket = null
      state.roomCode = null
      state.gameAcces = false
      state.gameSearching = false
      state.gameCreating = false
      return state 
      
    case 'START_SEARCHING':
      state.gameSearching = true
      state.socket = new WebSocket('ws://localhost:8000/ws/SearchRoom')
      return state 

    case 'START_CREATING':
      state.gameCreating = true
      state.socket = new WebSocket('ws://localhost:8000/ws/CreateRoom') 
      state.roomCode = (~~(Math.random()*1e8)).toString(16) 
      return state 

    case 'JOIN_REQUEST':
      state.socket = new WebSocket('ws://192.168.0.140:8000/ws/JoinRoom')   
      return state

     default: 
      return state 
    
    case 'CHANGE_ROOM_CODE':
      state.roomCode = action.roomCode
      return state
  }
}


// === ACTION CREATORS ===

export const goToGameActionCreator = () => ({type: GO_TO_GAME})
export const goToMenuActionCreator = () => ({type: GO_TO_MENU})

export const startSearchingActionCreator = () => ({type: START_SEARCHING})
export const startCreatingActionCreator = () => ({type: START_CREATING})
export const joinRequestActionCreator = () => ({type: JOIN_REQUEST})

export const changeRoomCodeActionCreator = (roomCode) => ({type: CHANGE_ROOM_CODE, roomCode})

export const gameUnmountActionCreator = () => ({type: GAME_UNMOUNT})

// =======================


export default rootReducer