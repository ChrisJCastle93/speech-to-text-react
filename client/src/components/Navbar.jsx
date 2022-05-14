import React from 'react';
import { Link } from "react-router-dom";
import AuthButtonDisplay from './AuthButtonDisplay';
// import SearchContainer from './search/SearchContainer';
import Microphone from './search/Microphone';
import SearchBar from './search/SearchBar';
import "./navbar.css";


export default function Navbar({loggedInUser, logoutHandler, searchTerm, searchHandler, handleSubmit, updateSpeechDone}) {
  return (
    <div className="navbar">
        <AuthButtonDisplay   
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
            />
      <div className='search'>
          <Microphone searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} />
          <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} />
          </div>
        {/* <SearchContainer
          handleSearchResults={handleSearchResults}
         /> */}
        <Link to="/profile/edit" className="auth-btn">edit profile</Link>

    </div>
  )
}
