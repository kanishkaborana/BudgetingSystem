import '../Styles/Custom.scss'
import { useState } from 'react';
import Login from './Login';
import axios from 'axios'
import { Redirect} from 'react-router-dom'
import { API_URL} from '../config'

// Main application
// Render login page unless user is logged in
function App() {

  // Set user to null
  const [user, setUser] = useState("")
  const [loginErrors, setErrors] = useState("")
  const [userType, setUserType] = useState("")

  // Login function to authenticate user with the provided credentials
  // Calls the API with a post request with the user credentials.
  // Checks if customer or admin logged in
  const loggedIn = credentials => {
    // Call the API and post the user credentials in the body
    axios.post(API_URL + '/users/authenticate', {
      userID: credentials.userID,
      password: credentials.password})
        .then((response) => {
            // Customer Authenicated
            if (response.data === "Customer Permission Granted") {
              setUserType("customer")
              setUser(credentials.userID)
            }
            // Admin Authenticated
            else if (response.data === "Admin Permission Granted") {
              setUserType("admin")
              setUser(credentials.userID)
            }
            // Invalid credentials
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
