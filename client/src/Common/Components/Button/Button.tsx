import styled from 'styled-components'

type ButtonPropsType = {
  size: "small" | "medium" | "large",
}

const Button = styled.button<ButtonPropsType>`
  background-color: #1b094b;
  color: white;
  height: 50px;
  width: 240px;
  border-radius: 25px;
  font-size: 110%;
`


export default Button