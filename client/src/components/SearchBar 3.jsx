import React from 'react'
import { IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar(props) {

    const handleChange = (e) => {
        let { value } = e.target;
        props.searchHandler(value);
    }
    
    return (
      <div>
        <form onSubmit={(e) => props.handleSubmit(e)}>
          <Input htmlSize={24} width="auto" variant="outline" type="text" className="" name="text" placeholder="Search" value={props.searchTerm} onChange={(e) => handleChange(e)} />
          {/* <IconButton icon={<SearchIcon />} type="submit"> */}
            {/* SEARCH AMAZON */}
          {/* </IconButton> */}
        </form>
      </div>
    );
  }  
