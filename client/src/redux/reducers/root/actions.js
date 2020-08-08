// === SAGA ACTIONS ===

export const GO_TO_GAME = 'GO_TO_GAME'
export const GO_TO_MENU = 'GO_TO_MENU'

export const CREATING_REQUEST = 'CREATING_REQUEST'
export const SEARCHING_REQUEST = 'SEARCHING_REQUEST'
export const JOINING_REQUEST = 'JOINING_REQUEST'

// === REDUX ACTIONS ===

export const SET_SOCKET = 'SET_SOCKET'

export const SET_GAME_ACCES = 'SET_GAME_ACCES'

export const SET_GAME_SEARCHING = 'SET_GAME_SEARCHING'

export const SET_GAME_CREATING = 'SET_GAME_CREATING'

export const SET_ROOM_CODE = 'SET_ROOM_CODE'



export const goToGameActionCreator = (history) => ({type: GO_TO_GAME, history})
export const goToMenuActionCreator = () => ({type: GO_TO_MENU})

export const searchingRequestActionCreator = (history) => ({type: SEARCHING_REQUEST, history})
export const creatingRequestActionCreator = (history) => ({type: CREATING_REQUEST, history})
export const joinRequestActionCreator = () => ({type: JOINING_REQUEST})

export const setRoomCodeActionCreator = (roomCode) => ({type: SET_ROOM_CODE, roomCode})


