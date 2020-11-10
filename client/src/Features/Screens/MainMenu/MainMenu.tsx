import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {mainMenuActions} from './MainMenuReducer'
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'
import {Button} from '@Common/Components/Button'
import {Input} from '@Common/Components/Input'
import {MainMenuContainer, MainMenuItem} from './MainMenuComponents'


const MainMenu = ({initRoomSearching, initRoomCreating}) => {
  return (
    <MainMenuContainer>
      <MainMenuItem>
        <Input type="text"/>
      </MainMenuItem>
      <MainMenuItem>
        <Button size="medium" onClick = {() => initRoomSearching()}>
          Search room
        </Button>
      </MainMenuItem>
      <MainMenuItem>
        <Button size="medium" disabled onClick = {() => initRoomCreating()}>
          Create room
        </Button>
      </MainMenuItem>
      <MainMenuItem>
        <Link to = '/JoinRoom'>
          <Button size="medium">Join room</Button>
        </Link>    
      </MainMenuItem>
    </MainMenuContainer>
  )
}

const mapDispatchToProps = {
  initRoomSearching: mainMenuActions.initRoomSearching,
  initRoomCreating: mainMenuActions.initRoomCreating,
}

export default compose(
  withHistoryUpdate,
  connect(null, mapDispatchToProps)
)(MainMenu)
