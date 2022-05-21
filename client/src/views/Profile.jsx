import React, {useState} from 'react';
import { CartItem } from "../components/cart/CartItem";
import { cartService } from "../services/localStorage";
import { NavLink } from 'react-router-dom';
import paris from "../assets/paris.png";

import "../css/profile.css";

export default function Profile (props) {
  const wishlist = cartService.getFromLocalStorage("wishlist");
  const [wishlistData, setWishlist] = useState(wishlist);

  const onClickDelete = (value) => {
    const copiedWishlist = [...wishlistData]

    const updatedWishlist = copiedWishlist.filter((x) => x.id !== value);

    setWishlist(updatedWishlist);

    cartService.addToLocalStorage("wishlist", updatedWishlist);

  }

  
  // useEffect(() => {
  //   setWishlist(wishlist);
  // }, []);

  console.log('wishlistData:', wishlistData)


  return (
    <div>
      <section className='profile-background'>
      <h1 className="profile-header">Get a light, {props.loggedInUser?.username}</h1>
      <NavLink className="profile-edit-btn" to="/profile/edit">Update your Info</NavLink>

      {/* <h3 className="profile-p">Scroll down for wishlist</h3> */}
      {/* <img className="profile-img" src ={paris} alt="lamp-setting" /> */}
      </section>
      <h2 className="profile-header-1">Your wishlist</h2>

      <div className="wishlist">
          {wishlistData?.map((item) => (
                  <CartItem key={item.id} {...item} onClickDelete={onClickDelete} isWishList noQuantity/> 
                ))} 
      </div>
     
    </div>
  )
}
