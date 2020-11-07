import React from 'react'
import {connect} from 'react-redux'
import Portal from '../Portal'
import {StateType} from 'rootReducer'

const ModalWindow = ({children}) => {
  return (
    <Portal>
      <div>
        <div>
          <div> 
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

const mapStateToProps = (state: StateType) => {
  return {
    
  }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)
