import {InferActions, InferActionsTypes} from '@Common/Types/ReduxTypes'

const initialState = {
  test: "test"
}

export const mainMenuActions = {
  initRoomSearching: () => ({type: "INIT_ROOM_SEARCHING"} as const),
  initRoomCreating: () => ({type: "INIT_ROOM_CREATING"} as const),
}

const mainMenuReducer = (state: IMainMenuState = initialState, action: Actions) => {
  switch (action.type) {
    default:
      return {...state}
  }
}

export type IMainMenuState = typeof initialState
export type Actions = InferActions<typeof mainMenuActions>
export type ActionTypes = InferActionsTypes<Actions>

export default mainMenuReducer