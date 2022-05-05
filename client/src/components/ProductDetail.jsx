import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';


function ProductDetail() {

    const [product, setProduct] = useState([]);
    const params = useParams()
	const productId = params.id

    useEffect(()=> {

        axios.get(`AMAZON-API/${productId}`)
        .then(response =>{
            setProduct(response.data)
        })
        .catch(err => console.log(err)) 
    }, [])


  return ( 

    <>
        <img src={product.image_url} alt="product"/>
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <p>{product.ratings}</p>
        <button>Add to checkout </button>
    </>
        )

}

export default ProductDetail