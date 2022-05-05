import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const productId = params.id;

  const resetCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    console.log(localStorage.getItem("cart"));
  };

  const addToCart = (product) => {
    const localCart = localStorage.getItem("cart");

    // console.log(localCart);
    const parsedCart = JSON.parse(localCart)

    let newCart = [...parsedCart]

    console.log('NEWCART', newCart);

    const cartProduct = {
      id: product.asin,
      name: product.title,
      price: product.variants[0].price.value,
      image: product.variants[0].main_image,
      quantity: 1,
    };

    newCart.push(cartProduct);

    console.log("LOCAL STORAGE BEFORE SET", localStorage.getItem("cart"));
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("LOCAL STORAGE AFTER SET", localStorage.getItem("cart"));
    // localStorage.setItem("cart", []);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/search/results/${productId}`)
      .then((response) => {
        //   console.log(response.data.product.variants[0].main_image)
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <img src={product.variants[0].main_image} alt="main" /> */}
      <h2>{product.title}</h2>/<p>{product.feature_bullets}</p>
      <Button onClick={() => addToCart(product)}>Add to Cart </Button>
      <Button onClick={() => resetCart()}>Reset Cart </Button>
    </>
  );
}

export default ProductDetail;
