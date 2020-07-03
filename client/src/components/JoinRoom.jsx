import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import {goToGameActionCreator, joinRequestActionCreator, setRoomCodeActionCreator} from '../redux/reducers/root/actions'

const JoinRoom = ({history}) => {

  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)
  const roomCode = useSelector(state => state.roomCode)
  const roomCodeArea = React.createRef()

  const goToGame = () => {
    dispatch(goToGameActionCreator())
    history.push('/Game')
  }

  const sendRoomCode = () => {
    socket.send(JSON.stringify({type: 'ROOM_CODE', payload: roomCode}))
  }

  useEffect(() => {
    console.log('РЕНДЕРИМ ЕГО ПАЦАНЫ')
    dispatch(joinRequestActionCreator())
    setTimeout(() => console.log(socket), 2000)
    console.log(socket)
    // socket.onmessage = msg => {
    //   const message = JSON.parse(msg.data)
    //   switch (message.type) {
    //     case "START_GAME" :
    //       goToGame()
    //       break
    //   }
    // }
  },[])

  return (
    <div>
      <div>TYPE ROOM CODE HERE</div>
      <input ref = {roomCodeArea} type="text" value = {roomCode} onChange = {() => dispatch(setRoomCodeActionCreator(roomCodeArea.current.value))}></input>
      <button onClick = {() => sendRoomCode()}>JoinRoom</button>
    </div>
  )
}


export default JoinRoom
