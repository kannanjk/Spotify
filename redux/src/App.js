import './App.css';
import Register from './Page/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Compponent/Home';
import Protect from './Compponent/Protect';
import React from 'react';
import Login from './Page/Login';
import Public from './Compponent/Public';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Public>
            <Home />
          </Public>
        } />
        <Route path='/register' element={
          <Protect>
            <Register />
          </Protect>} />
        <Route path='/login' element={
          <Protect>
            <Login />
          </Protect>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
