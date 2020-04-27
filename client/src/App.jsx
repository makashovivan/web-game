import React from 'react';
import './App.css';
import MainMenu from './MainMenu'
import CreateRoom from './CreateRoom'


const App = () => {


  return (
    <div>
      <MainMenu/>
      <CreateRoom/>
      {/* <SearchGame/>
      <JoinRoom/>       */}
    </div>
  )
}

export default App;
