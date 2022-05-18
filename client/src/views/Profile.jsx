import React, {useState, useEffect} from 'react';
import { CartItem } from "../components/cart/CartItem";
import { cartService } from "../services/localStorage";

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
      <h2>Hi {props.loggedInUser?.username} this is my profile</h2>
      <div className="wishlist">
          {wishlistData?.map((item) => (
                  <CartItem key={item.id} {...item} onClickDelete={onClickDelete} isWishList noQuantity/>
                ))}
      </div>
    </div>
  )
}
