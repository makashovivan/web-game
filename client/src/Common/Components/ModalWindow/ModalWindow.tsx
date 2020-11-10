import React from 'react'
import {Portal} from '@Common/Components/Portal'
import {WindowOverlay, WindowContainer, WindowHeader, WindowBody} from './ModalWindowComponents'

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
