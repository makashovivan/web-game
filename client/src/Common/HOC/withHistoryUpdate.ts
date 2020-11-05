import React, {useEffect} from 'react'

export const withHistoryUpdate = (component) => {
  const hoc: React.FC = () => {
    useEffect(() => {
      //some additional logic
    })
    return (component)
  }
  return hoc
}