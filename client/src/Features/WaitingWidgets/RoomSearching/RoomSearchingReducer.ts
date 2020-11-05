import {InferActions, InferActionsTypes} from 'store'

let initialState = {
  socket: WebSocket
}

export const roomSearchingActions = {
  setSearchingSocket: (socket: WebSocket) => ({type: "SET_SEARCHING_SOCKET", socket} as const),
  requestRoomSearching: () => ({type: "REQUEST_ROOM_SEARCHING"} as const),
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