import React, {useState} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes';

const App = () => {


  return (
    <BrowserRouter>
      <div>
      {useRoutes(false)}
      </div>
    </BrowserRouter>
  )
}

export default App;
