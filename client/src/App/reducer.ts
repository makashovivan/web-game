import {InferActions, InferActionsTypes} from '../store'
import {History} from 'history'

type WaitingType = "RoomSearching" | "RoomCreating" | "RoomJoining" 
type Pages = "/" | "/JoinRoom" | "/Game" | ""

let initialState = {
  gameAcces: false,
  waitingType: null,
  path: "/",
}

export type IMainState = typeof initialState


const mainReducer = (state: IMainState = initialState, action: Actions) => {

  switch (action.type) {

    case "SET_GAME_ACCESS": 
      console.log("SET_GAME_ACCESS")
      return {...state, gameAcces: action.gameAccess}
    
    case "SET_PATH":
      console.log("SET_PATH")
      return {...state, path: action.path}

    case "SET_WAITING_TYPE":
      console.log("SET_WAITING_TYPE")
      return {...state, waitingType: action.waitingType}

    default: 
      return {...state} 
  }
}

export const actions = {
  setGameAccess: (gameAccess: boolean) => ({type: "SET_GAME_ACCESS", gameAccess} as const),
  setPath: (path: Pages, history: History) => ({type: "SET_PATH", path, history} as const),
  setWaitingType: (waitingType: WaitingType) => ({type: "SET_WAITING_TYPE", waitingType} as const),
  setError: () => ({type: "SET_ERROR"} as const),
  setNotification: () => ({type: "SET_NOTIFICATION"} as const)
}

export type Actions = InferActions<typeof actions>

export type ActionTypes = InferActionsTypes<Actions>

export default mainReducer