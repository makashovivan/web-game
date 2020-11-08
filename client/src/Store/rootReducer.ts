import {combineReducers} from 'redux'
import appReducer from '../App/AppReducer'
import errorsReducer from '@Common/Widgets/Errors/reducer'
import mainMenuReducer from '@Features/Screens/MainMenu/MainMenuReducer'
import roomSearchingReducer from '@Features/WaitingWidgets/RoomSearching/RoomSearchingReducer'

const rootReducer = combineReducers({
  app: appReducer,
  errors: errorsReducer,
  mainMenu: mainMenuReducer,
  roomSearching: roomSearchingReducer,

})

export type StateType = ReturnType<typeof rootReducer>

export default rootReducer