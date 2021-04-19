import '../Styles/Custom.scss'
import { useState } from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar'
import Login from './Login';
import axios from 'axios'
import { Redirect, Link} from 'react-router-dom'
import { API_URL} from '../config'


function App() {

  const [user, setUser] = useState("")
  const [loginErrors, setErrors] = useState("")
  const [userType, setUserType] = useState("")

  const logout = () => {
    setUser("");
    <Link to =""/>
  }

  const loggedIn = credentials => {

    axios.post(API_URL + '/users/authenticate', {
      userID: credentials.userID,
      password: credentials.password})
        .then((response) => {
            let newLoggedIn = false;
            if (response.data === "Customer Permission Granted") {
              setUserType("customer")
              newLoggedIn = true;
              setUser(credentials.userID)
            }
            else if (response.data === "Admin Permission Granted") {
              setUserType("admin")
              newLoggedIn = true;
              setUser(credentials.userID)
            }
            else
              setErrors(response.data)
        });
         
          
  }
      


  return (
    <div className="App">
      {user === "" ? <Login Login = {loggedIn} errors = {loginErrors}/> : <Redirect to= {{pathname: '/Dashboard', state: {user: user, userType: userType}}}/>}
    </div>
  );
}

export default App;
