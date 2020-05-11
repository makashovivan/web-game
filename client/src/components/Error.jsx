import React from 'react';
import {closeErrorActionCreator} from '../redux/reducers/errorsReducer'

const Error = ({dispatch, state}) => {


  return (
    <div>
      <div>{state.error.type}</div>
      <div>{state.error.text}</div>
      <button onClick = {() => dispatch(closeErrorActionCreator())}>close</button>
    </div>

  )
}

export default Error;
