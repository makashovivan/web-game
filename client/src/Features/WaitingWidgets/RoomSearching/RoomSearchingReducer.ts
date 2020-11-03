import {InferActions, InferActionsTypes} from 'Main/store'
import {History} from 'history'

let initialState = {
  socket: WebSocket
}

export const roomSearchingActions = {
  setSearchingSocket: (socket: WebSocket) => ({type: "SET_SEARCHING_SOCKET", socket} as const),
  requestGameSearching: (history: History) => ({type: "REQUEST_GAME_SEARCHING", history} as const),
}

const roomSearchingReducer = (state: IRoomSearchingState = initialState, action: Actions) => {

  switch (action.type) {

    case "SET_SEARCHING_SOCKET":
      return {...state, socket: action.socket}

    default: 
      return {...state} 
  }
}

export type IRoomSearchingState = typeof initialState
export type Actions = InferActions<typeof roomSearchingActions>
export type ActionTypes = InferActionsTypes<Actions>

export default roomSearchingReducer