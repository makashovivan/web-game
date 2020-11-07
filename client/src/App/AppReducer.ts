import {InferActions, InferActionsTypes} from '@Common/Types/ReduxTypes'
import {History} from 'history'

type WaitingType = "RoomSearching" | "RoomCreating" | "RoomJoining" 
type Screens = "/" | "/JoinRoom" | "/Game" | ""

const initialState = {
  gameAccess: false,
  waitingType: null,
  path: "/",
  history: null,
}

export const appActions = {
  setHistory: (history: History) => ({type: "SET_HISTORY", history} as const),
  setGameAccess: (gameAccess: boolean) => ({type: "SET_GAME_ACCESS", gameAccess} as const),
  setPath: (path: Screens) => ({type: "SET_PATH", path} as const),
  setWaitingType: (waitingType: WaitingType) => ({type: "SET_WAITING_TYPE", waitingType} as const),
  setError: () => ({type: "SET_ERROR"} as const),
  setNotification: () => ({type: "SET_NOTIFICATION"} as const)
}

const appReducer = (state: IAppState = initialState, action: Actions) => {
  switch (action.type) {

    case "SET_HISTORY":
      console.log("SET_HISTORY")
      return {...state, history: action.history, path: action.history.location.pathname}

    case "SET_GAME_ACCESS": 
      console.log("SET_GAME_ACCESS")
      return {...state, gameAccess: action.gameAccess}
    
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