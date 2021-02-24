import '../Styles/Custom.scss'
import { useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import axios from 'axios'

const API = 'http://localhost:8080'



function App() {

  const [user, setUser] = useState("")

  const loggedIn = credentials => {

    axios.post(API + '/users/authenticate', {
              userID: credentials.userID,
              password: credentials.password
          })
          .then((response) => {
              let newLoggedIn = false;
              console.log(response);

              if (response.data === "Permission Granted") {
                  console.log("logged in");
                  newLoggedIn = true;
                  console.log("poop");
                  setUser(credentials.userID)
                  console.log(credentials.userID)
              }
              
              

                 
          });
         
          
  }
      


  return (
    <div className="App">
      {user === "" ? <Login Login = {loggedIn}/> : <Dashboard user = {user} />}
    </div>
  );
}

export default App;
