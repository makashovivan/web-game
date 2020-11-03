import React from 'react'
import {connect} from 'react-redux'
import Portal from '../Portal'

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

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)
