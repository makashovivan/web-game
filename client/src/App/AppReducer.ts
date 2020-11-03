import {InferActions, InferActionsTypes} from '@Store'
import {History} from 'history'

type WaitingType = "RoomSearching" | "RoomCreating" | "RoomJoining" 
type Screens = "/" | "/JoinRoom" | "/Game" | ""

const initialState = {
  gameAcces: false,
  waitingType: null,
  path: "/",
}

export const appActions = {
  setGameAccess: (gameAccess: boolean) => ({type: "SET_GAME_ACCESS", gameAccess} as const),
  setPath: (path: Screens, history: History) => ({type: "SET_PATH", path, history} as const),
  setWaitingType: (waitingType: WaitingType) => ({type: "SET_WAITING_TYPE", waitingType} as const),
  setError: () => ({type: "SET_ERROR"} as const),
  setNotification: () => ({type: "SET_NOTIFICATION"} as const)
}

const appReducer = (state: IAppState = initialState, action: Actions) => {
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

export type IAppState = typeof initialState
export type Actions = InferActions<typeof appActions>
export type ActionTypes = InferActionsTypes<Actions>

export default appReducer