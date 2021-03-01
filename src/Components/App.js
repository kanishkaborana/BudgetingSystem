import '../Styles/Custom.scss'
import { useState } from 'react';
import Dashboard from './Dashboard';
import Navbar from './Navbar'
import Login from './Login';
import axios from 'axios'
import { Link} from 'react-router-dom'


const API = 'http://localhost:8080'



function App() {

  const [user, setUser] = useState("")
  const [loginErrors, setErrors] = useState("")

  const logout = () => {
    setUser("");
    <Link to =""/>
  }

  const loggedIn = credentials => {

    axios.post(API + '/users/authenticate', {
              userID: credentials.userID,
              password: credentials.password
          })
          .then((response) => {
              let newLoggedIn = false;
              console.log(response.data);

              if (response.data === "Permission Granted") {
                  console.log("logged in");
                  newLoggedIn = true;
                  console.log("poop");
                  setUser(credentials.userID)
                  console.log(user)
                  console.log(credentials.userID)
                  
              }
              else
                setErrors(response.data)
              

                 
          });
         
          
  }
      


  return (
    <div className="App">
      <Navbar loggedIn = {(user != "")} logout = {logout}/>
      {user === "" ? <Login Login = {loggedIn} errors = {loginErrors}/> : <Dashboard user = {user} />}
    </div>
  );
}

export default App;
