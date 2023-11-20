import React from 'react';
import './App.css';

import Data from './data/data';
import Home from './home/home';
import Notfound from './NotFound/notfound';
import { Link, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div class='div1'>
    <nav>
        <ul>
          <li>
            <Link to="/data">Data</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
    </nav>
    <Routes>
      <Route path='/data' element={<Data/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/*' element={<Notfound/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
