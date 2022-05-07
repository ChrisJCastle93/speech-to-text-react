import { Center, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Test from "./Test";

export default function SearchContainer() {
  let [searchTerm, setSearchTerm] = useState("");
  let [speechDone, setSpeechDone] = useState(false);

  // Updates state based on either text or mic input

  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  // searches Amazon if text button is clicked

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    searchAmazon();
  };

  // Makes API call to backend for search

  const searchAmazon = () => {
    const queryString = new URLSearchParams({ q: searchTerm }).toString();
    axios.get(`http://localhost:5005/api/search?${queryString}`);
  };

  // Handling microphone speech

  const updateSpeechDone = () => {
    setSpeechDone(true);
  };

  useEffect(() => {
    if (speechDone) {
      searchAmazon();
    }
    // eslint-disable-next-line
  }, [speechDone]);

  return (
    <div>
      <Center>
        <HStack>
          <SearchBar searchTerm={searchTerm} searchHandler={searchHandler} handleSubmit={handleSubmit} />
          <Test searchHandler={searchHandler} handleSubmit={handleSubmit} updateSpeechDone={updateSpeechDone} />
        </HStack>
      </Center>
    </div>
  );
}
