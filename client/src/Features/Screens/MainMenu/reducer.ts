import {InferActions, InferActionsTypes} from 'Main/store'

const initialState = {
  
}

export const mainMenuActions = {
  initGameSearching: () => ({type: "INIT_GAME_SEARCHING"} as const),
  initGameCreating: () => ({type: "INIT_GAME_CREATING"} as const),
  initGameJoining: () => ({type: "INIT_GAME_JOINING"} as const),
}

const mainMenuReducer = (state: IMainMenuState = initialState, action: Actions) => {

}

export type IMainMenuState = typeof initialState
export type Actions = InferActions<typeof mainMenuActions>
export type ActionTypes = InferActionsTypes<Actions>

export default mainMenuReducer