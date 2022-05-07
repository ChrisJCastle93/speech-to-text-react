import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/search/Microphone";
import SearchContainer from "./components/search/SearchContainer";
import SearchResults from "./views/SearchResults";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from "react-router-dom";
import apiService from "./views/services/auth";
import Cart from "./views/cart/Cart";
import Profile from "./views/Profile";
import AuthButtonDisplay from "./components/AuthButtonDisplay";
import { UpdateUserForm } from "./views/auth/UpdateUserForm";
import ProductDetail from './components/ProductDetail';
import Checkout from './views/checkout/Checkout'

function App() {
  let [searchResultsArray, setSearchResultsArray] = useState([]);

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("loggedInUser", loggedInUser);

  React.useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching...");
      const res = await apiService.isLoggedIn();

      console.log(res);
      setLoggedInUser(res.data);
      setLoading(false);
    };
    console.log("use effect triggering");
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    await apiService.logout();
    setLoggedInUser(null);
    navigate("/");
  };

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

  console.log(loggedInUser);

  return (
    <ChakraProvider>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="App">
          <Link to="/profile/edit">edit profile</Link>
          <AuthButtonDisplay
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
          />
          <Routes>
            <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
            <Route path="/test" element={<Test />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile/edit" element={<UpdateUserForm loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/profile" element={<Profile loggedInUser={loggedInUser}/>} />
            <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
            <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
            <Route path="/search/results/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
          </Routes>
        </div>
      )}
    </ChakraProvider>
  );
}
export default App;
