import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Components/Login'
import Register from './Components/Register'
import reportWebVitals from './reportWebVitals';
import Dashboard from './Components/Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Route path = "/" exact component = {Login}/>
    <Route path = "/Login" exact component = {Login}/>
    <Route path = "/Register" exact component = {Register}/>
    <Route path = "/Home" exact component = {Dashboard}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
