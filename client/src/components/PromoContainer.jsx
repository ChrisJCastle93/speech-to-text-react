import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PromoContainer.css";
import { Box, Image, Badge } from "@chakra-ui/react";

export default function PromoContainer() {
  const [listOfPromo, setListOfPromo] = useState([]);

  React.useEffect(() => {

    const queryString = new URLSearchParams("q=designer+lamps");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search?${queryString}`)
      .then((response) => {
        setListOfPromo(response.data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
        <section id="promo-box">
      {listOfPromo.map((x) => {
        return (
          <Link key={x.link} to={`/search/results/${x.asin}`}>

            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
<Image src={x.image} id="promo" />

<Box p='6'>
  <Box display='flex' alignItems='baseline'>
    <Badge borderRadius='full' px='2' colorScheme='teal'>
      That's Hot!
    </Badge>
    <Box
      color='gray.500'
      fontWeight='semibold'
      letterSpacing='wide'
      fontSize='xs'
      textTransform='uppercase'
      ml='2'
    >
      Designer &bull; Lamps
    </Box>
  </Box>

  <Box
    mt='1'
    fontWeight='semibold'
    as='h4'
    lineHeight='tight'
    noOfLines={1}
  >
    {x.title}
  </Box>
  <Box>
          {x.price.value}
          <Box as='span' color='gray.600' fontSize='sm'>
            / EUR
          </Box>
        </Box>

</Box>
</Box>
          </Link>
        );
      })}{" "}
      </section>

    </div>
  )
  
}