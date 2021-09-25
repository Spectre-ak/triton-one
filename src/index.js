import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar/Navbar';

ReactDOM.render(
  <div>
      <Navbar/>
  </div>,
  document.getElementById('root')
);

fetch("https://triton-one-backend.azurewebsites.net/").catch(err => {
  
})