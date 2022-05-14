import React from "react";
import { Input } from "@chakra-ui/react";

export default function SearchBar(props) {
  const handleChange = (e) => {
    let { value } = e.target;
    props.searchHandler(value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <Input htmlSize={24} width="auto" variant="outline" type="text" className="" name="text" placeholder="Search" value={props.searchTerm} onChange={(e) => handleChange(e)} />
      </form>
    </div>
  );
}
