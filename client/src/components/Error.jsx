import React from 'react'
import { connect } from 'react-redux' 
import {closeErrorActionCreator} from '../redux/reducers/errors/errorsReducer'

const Error = (props) => {
  return (
    <div>
      <div>{props.error.type}</div>
      <div>{props.error.text}</div>
      <button onClick = {() => props.closeError()}>close</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error, 
  }
}

const mapDispatchToProps = {
  closeError: closeErrorActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)
