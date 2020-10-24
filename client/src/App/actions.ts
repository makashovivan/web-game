// === SAGA ACTIONS ===

export type AppSagaActions = "GO_TO_GAME" | "GO_TO_MENU" | "CREATING_REQUEST" | "SEARCHING_REQUEST" | "JOINING_REQUEST" | "SEND_ROOM_CODE"
export type AppReduxActions = "SET_SOCKET" | "SET_GAME_ACCES" | "SET_WAITING_TYPE" | "SET_ROOM_CODE"

export const GO_TO_GAME = 'GO_TO_GAME'
export const GO_TO_MENU = 'GO_TO_MENU'

export const CREATING_REQUEST = 'CREATING_REQUEST'
export const SEARCHING_REQUEST = 'SEARCHING_REQUEST'
export const JOINING_REQUEST = 'JOINING_REQUEST'

export const SEND_ROOM_CODE = 'SEND_ROOM_CODE'

// === REDUX ACTIONS ===

export const SET_SOCKET = 'SET_SOCKET'

export const SET_GAME_ACCES = 'SET_GAME_ACCES'

export const SET_WAITING_TYPE = 'SET_WAITING_TYPE'

export const SET_ROOM_CODE = 'SET_ROOM_CODE'




export const goToGameActionCreator = (history) => ({type: GO_TO_GAME, history})
export const goToMenuActionCreator = () => ({type: GO_TO_MENU})

export const searchingRequestActionCreator = (history) => ({type: SEARCHING_REQUEST, history})
export const creatingRequestActionCreator = (history) => ({type: CREATING_REQUEST, history})
export const joinRequestActionCreator = (history) => ({type: JOINING_REQUEST, history})

export const setRoomCodeActionCreator = (roomCode) => ({type: SET_ROOM_CODE, roomCode})

export const sendRoomCodeAcrionCreator = (history) => ({type: SEND_ROOM_CODE, history})