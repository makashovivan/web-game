import React from 'react'
import styled from 'styled-components'
import {Portal} from '@Common/Components/Portal'

const WindowOverlay = styled.div` 
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const WindowContainer = styled.div`
  display: inline-block;
  position: absolute;
`
const WindowHeader = styled.div`
  background-color: #ffffff;
  height: 30px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`
const WindowBody = styled.div`
  background-color: black;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`

const ModalWindow = ({children}) => {
  return (
    <Portal>
      <WindowOverlay onClick={() => console.log("PRESSED")}>
        <WindowContainer>
          <WindowHeader/>
          <WindowBody>
            {children}
          </WindowBody>
        </WindowContainer>
      </WindowOverlay>
    </Portal>
  )
}

export default ModalWindow
