import React from 'react';
import { Link } from "react-router-dom";
import AuthButtonDisplay from './AuthButtonDisplay';
import SearchContainer from './search/SearchContainer';
<<<<<<< HEAD
import { HamburgerIcon } from 'react-hamburger-icon';
// import Microphone from './search/Microphone';
// import SearchBar from './search/SearchBar';
import '../css/Navbar.css';


export default function Navbar({loggedInUser, logoutHandler, handleSearchResults}) {
  // const [open, setOpen] = useState(false);
=======
// import Microphone from './search/Microphone';
// import SearchBar from './search/SearchBar';
import "./../css/Navbar.css";


export default function Navbar({logoutHandler, loggedInUser, handleSearchResults}) {
>>>>>>> new-dev
  return (
    <nav className="navbar">
      {/* <HamburgerIcon open={open} onClick={() => setOpen(!open)} className="icon"/> */}
      <ul className="navbar-menu">
        <li>
          <AuthButtonDisplay   
              loggedInUser={loggedInUser}
              logoutHandler={logoutHandler}
              />
        </li>
        <li>
          <Link to="/profile/edit" className="auth-btn">edit profile</Link>
        </li>
      </ul>
      {/* <div className='search'>
          <Microphone searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} handleSearchResults={handleSearchResults} />
          <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} handleSearchResults={handleSearchResults} />
          </div> */}
          
        <SearchContainer className="search-cont"
          handleSearchResults={handleSearchResults}
         />

    </nav>
  )
}
