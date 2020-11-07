import {InferActions, InferActionsTypes} from '@Common/Types/ReduxTypes'


let initialState = {
  gameSocket: WebSocket
}

export const gameActions = {
  setGameSocket: (socket: WebSocket) => ({type: "SET_GAME_SOCKET", socket} as const),
  connectToRoom: (roomId: String) => ({type: "CONNECT_TO_ROOM", roomId} as const),
}

const gameReducer = (state: IGameState = initialState, action: Actions) => {

  switch (action.type) {

    case "SET_GAME_SOCKET":
      return {...state, socket: action.socket}

    default: 
      return {...state} 
  }
}

export type IGameState = typeof initialState
export type Actions = InferActions<typeof gameActions>
export type ActionTypes = InferActionsTypes<Actions>

export default gameReducer