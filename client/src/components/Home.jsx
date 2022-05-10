
import { Link } from 'react-router-dom';
import React from 'react';
import header from '../assets/header.jpeg'
import PromoContainer from './PromoContainer';
import home from '../css/Home.css'

function Home(props) {
  return (
<div className='home'>
   
      <h1>Lamp Daddy</h1>
      <h2>{props.loggedInUser ? `Welcome ${props.loggedInUser.username}` : ""}</h2>








      <section className="header">
      <h1 className="text">Lamp Daddy</h1>
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
        <Link to={`/search/:?`}>
          <PromoContainer />
        </Link>

      </section>

      <footer>
        <p>This is made by Annabelle, Chris and Caro</p>
      </footer> 
      </div>
  );
}

export default Home;
