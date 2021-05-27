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

fetch("https://triton-one-backend.azurewebsites.net/").then(response=>response.text()).then(res=>{console.log(res)});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
