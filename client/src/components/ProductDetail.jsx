import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


function ProductDetail() {

    const [product, setProduct] = useState([]);
    const params = useParams()
	const productId = params.id

    useEffect(()=> {

        axios.get(`http://localhost:5005/api/search/results/${productId}`)
        .then(response =>{
            setProduct(response.data)
        })
        .catch(err => console.log(err)) 
    }, [])


  return ( 

    <>
    <h1>{productId}</h1>
        <img src={product.product.main_image} alt="image"/>
        <h2>{product.product.title}</h2>
        <p>{product.product.feature_bullets}</p>
        
        <Link>Add to checkout </Link>
    </>
        )

}

export default ProductDetail