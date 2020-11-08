import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {StateType} from 'Store/rootReducer'
import {ModalWindow} from '@Common/Components/ModalWindow'

const RoomSearchingBody = styled.div`
  background-color: #d39539;
  width: 300px;
  
`

const RoomSearching = (props) => {
  return (
    <ModalWindow>
      <RoomSearchingBody>
        <div> RoomSEARCHING </div>
        <button onClick = {props.goToMenu}>Stop searching</button>
      </RoomSearchingBody>
    </ModalWindow>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    socket: state, 
  }
}

const mapDispatchToProps = {
  //goToMenu: goToMenuActionCreator, 
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSearching)