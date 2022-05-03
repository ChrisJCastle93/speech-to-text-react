import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom"; 

function SearchResults() {

  const [productArr, setProductArr] = useState([]);

  useEffect(()=> {

    axios.get(`Amazon-API?`)
    .then(response =>{
        setProductArr(response.data)
    })
    .catch(err => console.log(err))
  }, [])



  return (
    <>

      {productArr.map(product => {
        return(
          <div key={product._id}>
          <Link to={`/search/${product._id}`}>
            <img className="img" src={product.image_url} alt="product"/>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </Link>
          </div>
        )
      })}
    </>
  )
}
export default SearchResults