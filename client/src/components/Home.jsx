
import { Link } from 'react-router-dom';
import React from 'react';
import header from '../assets/header.jpeg'
import PromoContainer from './PromoContainer';
import '../css/Home.css';


function Home(props) {
  return (
<div className='home'>
      <h2>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : ""}</h2>


      <header className="header">
      <h1 className="text">Lamp Daddy</h1>
      </header>


      <section>

        <Link to={`/search/:?`}>
          <PromoContainer />
        </Link>

      </section>

  
      </div>
  );
}

export default Home;
