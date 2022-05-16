import React from 'react';
import { Link } from "react-router-dom";
import AuthButtonDisplay from './AuthButtonDisplay';
import SearchContainer from './search/SearchContainer';
// import Microphone from './search/Microphone';
// import SearchBar from './search/SearchBar';
// import "./css/navbar.css";
import '../css/Navbar.css';


export default function Navbar({loggedInUser, logoutHandler, handleSearchResults}) {
  return (
    <nav className="navbar">
        <AuthButtonDisplay   
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
            />
      {/* <div className='search'>
          <Microphone searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} />
          <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} />
          </div> */}
        <SearchContainer className="search-cont"
          handleSearchResults={handleSearchResults}
         />
        <Link to="/profile/edit" className="auth-btn">edit profile</Link>

    </nav>
  )
}
