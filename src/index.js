import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './Components/App';
import Login from './Components/Login'
import AddUser from './Components/AddUser'
import Register from './Components/Register'
import reportWebVitals from './reportWebVitals';
import Dashboard from './Components/Dashboard';
import LoadingPage from './Components/LoadingPage';
import Profile from './Components/Profile'
import AddExpense from './Components/AddExpense'
import EditUser from './Components/EditUser'

ReactDOM.render(
  <BrowserRouter>
    <Route path = "/" exact component = {App}/>
    <Route path = "/AddExpense" exact component = {AddExpense}/>
    <Route path = "/AddUser" exact component = {AddUser}/>
    <Route path = "/Login" exact component = {App}/>
    <Route path = "/Register" exact component = {Register}/>
    <Route path = "/Dashboard" exact component = {Dashboard}/>
    <Route path = "/Profile/:username" exact component = {Profile}/>
    <Route path = "/EditUser" exact component = {EditUser}/>
    <Route path = "/Register/Success" exact render = {(props) => <LoadingPage {...props} status = "Successfully Registered" button = "/" buttonText = "Return to login"/>}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
