
import { Link } from 'react-router-dom';
import PromoContainer from './PromoContainer';
import '../css/Home.css';
import { Divider } from '@chakra-ui/react';


function Home(props) {

  return (
<div className='home'>
     
      <Divider orientation='horizontal' />
    


      <section className="header">
     <h1 className="text"></h1>
      </section>

      <section id="promoSection">
      <Divider orientation='horizontal' />
<p className='welcome'>New in</p> 

        <Link to={`/search/:?`}>
          <PromoContainer />
        </Link>

      </section>
      
      </div>
  );
}

export default Home;
