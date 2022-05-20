
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/search/Microphone";
import SearchContainer from "./components/search/SearchContainer";
import SearchResults from "./views/SearchResults";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Signup } from "./views/auth/Signup";
import { Login } from "./views/auth/Login";
import { useNavigate } from 'react-router-dom';
import apiService from "./views/services/auth";
import Cart from "./views/cart/Cart";
import Profile from "./views/Profile";
import ProductDetail from './components/ProductDetail';
import Checkout from './views/checkout/Checkout';
// import AuthButtonDisplay from "./components/AuthButtonDisplay";
import { UpdateUserForm } from "./views/auth/UpdateUserForm";
import Navbar from './components/Navbar1';
import '../src/css/authForm.css';
import Footer from './components/search/Footer';
import Header from './components/search/Header';



function App() {
  let [searchResultsArray, setSearchResultsArray] = useState([]);

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await apiService.isLoggedIn();
      setLoggedInUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    await apiService.logout();
    setLoggedInUser(null);
    navigate('/')
  };

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

  return (
  

    <ChakraProvider>
    {loading ? (
      <div>Loading.....</div>
    ) : (
        <div className="App">
            <Header/>
        <Navbar 
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
            handleSearchResults={handleSearchResults}
        />


        {/* <Link to="/profile/edit">edit profile</Link>
          <AuthButtonDisplay
            loggedInUser={loggedInUser}
            logoutHandler={logoutHandler}
          /> */}
          <Routes>
            <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
            <Route path="/test" element={<Test />} />
            <Route path="/cart" element={<Cart loggedInUser={loggedInUser} />} />
            <Route path="/profile/edit" element={<UpdateUserForm loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/signup" element={<Signup setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
            <Route path="/profile" element={<Profile loggedInUser={loggedInUser}/>} />
            <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
            <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
            <Route path="/search/results/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout loggedInUser={loggedInUser} />} />
          </Routes>
         

          <Footer/>
        </div>
        )}
    </ChakraProvider>

  );
}
export default App;
