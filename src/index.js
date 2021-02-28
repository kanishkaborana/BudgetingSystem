import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App';
import Login from './Components/Login'
import Register from './Components/Register'
import reportWebVitals from './reportWebVitals';
import Dashboard from './Components/Dashboard';
import LoadingPage from './Components/LoadingPage';

ReactDOM.render(
  <BrowserRouter>
    <Route path = "/" exact component = {App}/>
    <Route path = "/Login" exact component = {App}/>
    <Route path = "/Register" exact component = {Register}/>
    <Route path = "/Home" exact component = {Dashboard}/>
    <Route path = "/Register/Success" exact render = {(props) => <LoadingPage {...props} status = "Successfully Registered" button = "/Login" buttonText = "Return to login"/>}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
