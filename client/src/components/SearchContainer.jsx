// import { Center, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/search/SearchBar";
import Microphone from "../components/search/Microphone";
import { useNavigate } from "react-router-dom";

export default function SearchContainer(props) {
  let [searchTerm, setSearchTerm] = useState("");
  let [speechDone, setSpeechDone] = useState(false);

  const navigate = useNavigate();

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    searchAmazon();
  };

  useEffect(() => {
    if (speechDone) {
      searchAmazon();
    }
  }, [speechDone, searchTerm, searchAmazon]);

  const searchAmazon = async () => {
    const queryString = new URLSearchParams({ q: searchTerm }).toString();
    
    const searchResults = await axios.get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`);
    
    props.handleSearchResults(searchResults);
    
    navigate("/search/results");
  };

  const updateSpeechDone = () => {
    setSpeechDone(true);
  };

  return (
      <ul>
      {/* <Center>
        <HStack mt={10}> */}
        <li>
          <SearchBar className="search-bar" searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} /> 
        </li>
        <li>
          <Microphone className="mic" searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} />
        </li>
        {/* </HStack>
      </Center> */}
      </ul>
  );
}
