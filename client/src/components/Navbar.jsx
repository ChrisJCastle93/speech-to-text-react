import React from 'react';
import { Link } from "react-router-dom";
import AuthButtonDisplay from './AuthButtonDisplay';
import SearchContainer from './search/SearchContainer';
// import Microphone from './search/Microphone';
// import SearchBar from './search/SearchBar';
import "./../css/Navbar.css";


export default function Navbar({logoutHandler, loggedInUser, handleSearchResults}) {
  return (
    <div className="navbar">
        <AuthButtonDisplay   
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
            />
      {/* <div className='search'>
          <Microphone searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} handleSearchResults={handleSearchResults} />
          <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} handleSearchResults={handleSearchResults} />
          </div> */}
        <SearchContainer
          handleSearchResults={handleSearchResults}
         />
        <Link to="/profile/edit" className="auth-btn">edit profile</Link>

    </div>
  )
}
