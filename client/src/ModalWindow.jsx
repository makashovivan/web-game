import React from 'react';

const ModalWindow = ({type, text, onExit}) => {


  return (
    <div>
      <div>{type}</div>
      <div>{text}</div>
      <button onClick = {onExit}>close</button>
    </div>

  )
}

export default ModalWindow;
