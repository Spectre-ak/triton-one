import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar/Navbar';

function Holder(){
  return(
    <div>
      <Navbar/>
    </div>
  )
}

ReactDOM.render(
  <Holder/>,
  document.getElementById('root')
);

fetch("https://triton-one-backend.azurewebsites.net/").catch(err => {
  
})