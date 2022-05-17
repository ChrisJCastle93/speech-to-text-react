import React from 'react';
import {NavLink} from 'react-router-dom';

export default function AuthButtonDisplay(props) {
  return (
    <div>
        <header>
        <NavLink to="/" activeclassname="active" className="auth-btn">Home</NavLink>
            {
                !props.loggedInUser ?
                    <>
                        <NavLink to="/signup" activeclassname="active" className="auth-btn">Signup</NavLink>

                        <NavLink to="/login" activeclassname="active" className="auth-btn">Login</NavLink>

                    </>
                    :
                    <>
                        <NavLink to="/profile" activeclassname="active" className="auth-btn">Profile</NavLink>
                        
                        <button onClick={props.logoutHandler} className="danger auth-btn">Logout</button>              
                    </>
            }
        </header>


        {/* <h1>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : 'Welcome to Lamp Daddy' }</h1> */}
    
    </div>
  )
}
