import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';



function loggedIn() {
  if (this.state.user === ""){
    return false;
  }
  else {
    return true;
  }
}


function App() {

  const [user, setUser] = useState()




  return (
    <div className="App">
      {loggedIn ? <Dashboard User = {this.state.user} /> : <Login/>}
    </div>
  );
}

export default App;
