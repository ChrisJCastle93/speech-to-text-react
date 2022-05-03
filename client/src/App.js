import {  Routes, Route } from "react-router-dom";
import React from "react";
import Home from './views/Home'
import axios from "axios";
import Test from './views/Test'
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from 'react-router-dom';
import apiService from "./views/services/auth";


function App() {
  console.log(process.env.REACT_APP_PORT)

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = React.useState(null);

  // const getLoggedInUser = async () => {
  //   const data = await axios.get('/api/auth/loggedin');
  //   setLoggedInUser(data)
  // }

  // React.useEffect(() => {
  //   getLoggedInUser();
  // }, [])

  const logoutHandler = async () => {
    await apiService.logout();
    setLoggedInUser(null);
    navigate('/')
  };

  // const logoutHandler = () => {
  //   apiService.logout().then(done => {
  //     setLoggedInUser(null)
  //     navigate('/')
  //   })
  // }

  return (
      <div className="App">
      <h1>{loggedInUser ? loggedInUser.username : ""}</h1>
      <button type="button" onClick={ logoutHandler } >Logout</button>


        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/test" element={ <Test  /> } />
          <Route path="/signup" element={ <Signup  /> } />
          <Route path="/login" element={ <Login  /> } />
        </Routes>
      </div>
  );
}

export default App;
