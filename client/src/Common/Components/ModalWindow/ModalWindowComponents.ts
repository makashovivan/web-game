import styled from 'styled-components'

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

export {WindowOverlay, WindowContainer, WindowHeader, WindowBody}