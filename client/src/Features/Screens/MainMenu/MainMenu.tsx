import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {mainMenuActions} from './MainMenuReducer'
import {withHistoryUpdate} from '@Common/HOC/withHistoryUpdate'
import {Button} from '@Common/Components/Button'
import {Input} from '@Common/Components/Input'


const MainMenuContainer = styled.div`
  width: 320px;
  //height: 200px;
  background-color: #cacaca;
  border-radius: 25px;
  margin: auto;
  padding: 30px;
  display: grid;
`

const MainMenuItem = styled.div`
  text-align: center;
  padding: 3px;
`

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
