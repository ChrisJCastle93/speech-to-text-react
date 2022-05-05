
import { Link } from 'react-router-dom';
import React from 'react';
import header from '../assets/header.jpeg'

function Home(props) {
  return (
<div className='home'>
   
      <h1>Lamp Daddy</h1>
      <h2>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : ""}</h2>

 <section id="header">
        <div>
          <image className='headerImage' src={header} alt="ambience-picture" />
        </div>
      </section>

      <section id="promo">

          <Link to={`/search/:?`}>
            <div className="promo-container"> 

     {/* Image-Tag should include src={thewaytopreselectedlamps}  */}

          <img className="imagePromo" alt="lamps" />
              <img className="imagePromo"  alt="lamps" />
              <img className="imagePromo" alt="lamps" />
            </div>
          </Link>

          <Link to={`/search/:?`}>
            <div className="promo-container"> 

           {/* Image-Tag should include src={thewaytopreselectedlamps} */}

         <img className="imagePromo" alt="lamps" />
              <img className="imagePromo"  alt="lamps" />
              <img className="imagePromo" alt="lamps" />
            </div>
          </Link>

      </section>

      <footer>
        <p>This is made by Annabelle, Chris and Caro</p>
      </footer> 
      </div>
  );
} 

export default Home;
