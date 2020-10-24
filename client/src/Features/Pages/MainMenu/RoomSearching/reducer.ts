import {InferActions, InferActionsTypes} from '../../../../store'


let initialState = {
  socket: WebSocket
}

export type IRoomSearchingState = typeof initialState


const roomSearchingReducer = (state: IRoomSearchingState = initialState, action: Actions) => {

  switch (action.type) {

    case "SET_SEARCHING_SOCKET":
      return {...state, socket: action.socket}

    default: 
      return {...state} 
  }
}

export const actions = {
  setSearchingSocket: (socket: WebSocket) => ({type: "SET_SEARCHING_SOCKET", socket} as const),
}

export type Actions = InferActions<typeof actions>

export type ActionTypes = InferActionsTypes<Actions>

export default roomSearchingReducer