
import { Link } from 'react-router-dom';
import React from 'react';
import header from '../assets/header.jpeg'
import PromoContainer from './PromoContainer';
import home from '../css/Home.css'

function Home() {



  return (
    <div>



      <section className="header">
      <h1 className="text">Lamp Daddy</h1>
      </section>

      <section id="promo">

        <Link to={`/search/:?`}>
          <PromoContainer />
        </Link>

      </section>

      <footer>
        <p>This is made by Anabelle, Chris and Caro</p>
      </footer>
    </div>
  );
}

export default Home;
