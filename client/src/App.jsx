import React from 'react';
import './App.css';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom'
import MainMenu from './MainMenu'
import JoinRoom from './JoinRoom'
import Game from './Game'
import GameSearching from './GameSearching'
import GameCreating from './GameCreating'
import Error from './Error'
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const App = ({state, store}) => {


  console.log(state)

  let history = useHistory()


  return (
    <div>
      <CSSTransition
          in={state.error.render}
          timeout={800}
          classNames="alert"
          unmountOnExit
          >
            <Error dispatch = {store.dispatch} state = {state}/>

      </CSSTransition>
      <CSSTransition
          in={state.gameSearching}
          timeout={800}
          classNames="alert"
          unmountOnExit
          >
        <GameSearching 
            history = {history} 
            dispatch = {store.dispatch}
            state = {state}/>  
      </CSSTransition>
      <CSSTransition
          in={state.gameCreating}
          timeout={800}
          classNames="alert"
          unmountOnExit
          >
      <GameCreating history = {history} 
                    dispatch = {store.dispatch}
                    state = {state}/> 
      </CSSTransition>
      <div>{'Game Acces = ' + state.gameAcces.toString()}</div> 
      <Switch>
        <Route exact path = '/' render={() => <MainMenu dispatch = {store.dispatch}/>}/>
        <Route exact path = '/JoinRoom'  render={() => <JoinRoom history = {history} 
                                                                 dispatch = {store.dispatch}
                                                                 state = {state}/>}/>
        {state.gameAcces ? <Route exact path = '/Game' render={() => <Game dispatch = {store.dispatch}
                                                                           state = {state}/>}/>
                         : null}

        <Redirect to = '/'/>
      </Switch>
    </div>
  )
}

export default App;
