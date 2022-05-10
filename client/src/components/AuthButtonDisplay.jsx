import React from 'react';
import {NavLink} from 'react-router-dom';

export default function AuthButtonDisplay(props) {
  return (
    <div>
        <header>
        <NavLink to="/" activeclassname="active">Home</NavLink>
            {
                !props.loggedInUser ?
                    <>
                        <NavLink to="/signup" activeclassname="active">Signup</NavLink>
                        <NavLink to="/login" activeclassname="active">Login</NavLink>
                    </>
                    :
                    <>
                        <NavLink to="/profile" activeclassname="active">Profile</NavLink>
                        <button onClick={props.logoutHandler} className="danger">Logout</button>
                    </>
            }
        </header>


        <h1>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : 'Welcome to Lamp Daddy' }</h1>
    
    </div>
  )
}
