import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { cartService } from "../services/localStorage";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  const resetCart = () => {
    cartService.addToLocalStorage("cart", []);
  };

  const addToCart = (product) => {
    const cart = cartService.getFromLocalStorage("cart");

    let newCart = [...cart];

    const cartProduct = {
      id: product.asin,
      name: product.title,
      price: product.variants[0].price.value,
      image: product.variants[0].main_image,
      quantity: 1,
    };

    newCart.push(cartProduct);

    cartService.addToLocalStorage("cart", newCart);

    navigate("/cart");
  };

  const addToWishlist = (product) => {
    const wishlist = cartService.getFromLocalStorage("wishlist");

    if (!wishlist) {
      cartService.addToLocalStorage("wishlist", []);
    }
    console.log("wishlist", wishlist);
    let newWishlist = [...wishlist];

    const wishlistProduct = {
      id: product.asin,
      name: product.title,
      price: product.variants[0].price.value,
      image: product.variants[0].main_image,
      quantity: 1,
    };

    newWishlist.push(wishlistProduct);

    cartService.addToLocalStorage("wishlist", newWishlist);

    navigate("/profile");
  };

  useEffect(() => {
    const wishlist = cartService.getFromLocalStorage("wishlist");
    const cart = cartService.getFromLocalStorage("cart");
    if (!wishlist || !cart) {
      cartService.addToLocalStorage("wishlist", []);
      cartService.addToLocalStorage("cart", []);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search/results/${productId}`)
      .then((response) => {
        //   console.log(response.data.product.variants[0].main_image)
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <>
      {/* <img src={product.variants[0].main_image} alt="main" /> */}
      <h2>{product.title}</h2>/<p>{product.feature_bullets}</p>
      <Button onClick={() => addToCart(product)}>Add to Cart </Button>
      <Button onClick={() => resetCart()}>Reset Cart </Button>
      <Button onClick={() => addToWishlist(product)}>Add to Wishlist </Button>
    </>
  );
}

export default ProductDetail;
