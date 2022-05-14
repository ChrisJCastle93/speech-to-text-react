class LocalStorageService {
    addToLocalStorage = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    getFromLocalStorage = (key) => {
      const wishlist = localStorage.getItem(key);
      const parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist
    };
  }
  
  const wishlistService = new LocalStorageService();
  
  export { wishlistService };
  