import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {appActions} from '../../App/AppReducer'


/**
 * This HOC updates history object in AppReducer when component mounts
 * 
 * @param Component Component should be root component for the specific URI(Screen)  
 */
export const withHistoryUpdate = (Component) => {
  const WithHistoryUpdateComponent: React.FC<any> = (props) => {
    useEffect(() => {
      props.setHistory(props.history)
    }, [])
    return (
      <Component/>
    )
  }
  const mapDispatchToProps = {
    setHistory: appActions.setHistory
  }
  return compose(
    withRouter,
    connect(null, mapDispatchToProps),
  )(WithHistoryUpdateComponent)
}