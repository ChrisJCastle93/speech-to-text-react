import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Test from "./components/Microphone";
import SearchContainer from "./views/SearchContainer";
import SearchResults from "./views/SearchResults";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  let [searchResultsArray, setSearchResultsArray] = useState([]);

  const handleSearchResults = (searchResults) => {
    setSearchResultsArray(searchResults.data);
  };

  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/search" element={<SearchContainer handleSearchResults={handleSearchResults} />} />
            <Route path="/search/results" element={<SearchResults searchResultsArray={searchResultsArray} />} />
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
