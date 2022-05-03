import { Routes, Route } from 'react-router-dom';
import React from 'react';
import {Navbar} from './components/Navbar';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import ProductDetail from './components/ProductDetail';



function App() {


const handleSearchResults =(data)=>{
console.log("searchResults",data)
}

  return (
  
    <div>
        <Navbar handleSearchResults={handleSearchResults}/>

      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/search/:?" element={<SearchResults />} />
          <Route path="/search/:product._id" element={<ProductDetail />} />
        </Routes>
      </div>
      <footer>
        <p>This is made by Anabelle, Chris and Caro</p>
      </footer> 
    </div> 

  );
}
export default App;
