import { Box } from "@chakra-ui/react";
import * as React from "react";
import { ProductCard } from "../components/ProductCard";
// import { products } from "./_data";
import { ProductGrid } from "../components/ProductGrid";

export default function SearchResults(props) {
  const products = props.searchResultsArray;
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <ProductGrid>
        {/* <h1>{products.length}</h1> */}
        {products.map((product) => (
          <ProductCard key={product.asin} product={product} />
        ))}
      </ProductGrid>
    </Box>
  );
}
