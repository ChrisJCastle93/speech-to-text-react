import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { cartService } from "../services/localStorage.js";
import { Box, chakra, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, Spinner, useColorModeValue, VisuallyHidden, UnorderedList, List, ListItem } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaHeart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishListed, setIsWishListed] = useState(false);
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();

  const resetCart = () => {
    cartService.addToLocalStorage("cart", []);
  };

  const addToCart = (product) => {
    const cart = cartService.getFromLocalStorage("cart");

    let newCart = [...cart];

    const cartProduct = {
      id: product.asin,
      name: product.title,
      price: product.variants[0].price.value,
      image: product.variants[0].main_image,
      quantity: 1,
    };

    newCart.push(cartProduct);

    cartService.addToLocalStorage("cart", newCart);

    navigate("/cart");
  };

  const addToWishlist = (product) => {
    const wishlist = cartService.getFromLocalStorage("wishlist");

    if (!wishlist) {
      cartService.addToLocalStorage("wishlist", []);
    }
    let newWishlist = [...wishlist];

    const wishlistProduct = {
      id: product.asin,
      name: product.title,
      price: product.variants[0].price.value,
      image: product.variants[0].main_image,
      quantity: 1,
    };

    newWishlist.push(wishlistProduct);

    cartService.addToLocalStorage("wishlist", newWishlist);

    console.log("wishlist cliicked");

    setIsWishListed((s) => !s);

    navigate("/profile");
  };

  useEffect(() => {
    console.log("USING EFFECT");
    const wishlist = cartService.getFromLocalStorage("wishlist");
    const cart = cartService.getFromLocalStorage("cart");
    if (!wishlist || !cart) {
      cartService.addToLocalStorage("wishlist", []);
      cartService.addToLocalStorage("cart", []);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/search/results/${productId}`)
      .then((response) => {
        console.log("API RESPONSE FROM SEARCH");
        setIsLoading(false);
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <Container maxW={"7xl"}>
      {isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
          <Flex>
            <Image rounded={"md"} alt={"product image"} src={product.main_image.link} fit={"cover"} align={"center"} w={"100%"} h={{ base: "100%", sm: "400px", lg: "500px" }} />
          </Flex>
          <Stack spacing={{ base: 6, md: 6 }}>
            <Box as={"header"}>
              <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}>
                {product.title}
              </Heading>
              <Text color="gray.900" fontWeight={300} fontSize={"2xl"}>
                {product.variants[0].price.value} {product.variants[0].price.symbol}
              </Text>
            </Box>

            <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={<StackDivider color="gray.500" />}>
              <VStack spacing={{ base: 4, sm: 6 }}>
                {product.description ? (
                  <Text color="gray.500" fontSize={"2xl"} fontWeight={"300"}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
                  </Text>
                ) : (
                  <></>
                )}
              </VStack>
              <Box>
                <Text fontSize={{ base: "16px", lg: "18px" }} color="yellow.500" fontWeight={"500"} textTransform={"uppercase"} mb={"4"}>
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
                  <UnorderedList spacing={2}>
                    {product.feature_bullets.map((feature, index) => {
                      return <ListItem key={index}>{feature}</ListItem>;
                    })}
                  </UnorderedList>
                </SimpleGrid>
              </Box>
            </Stack>

            <Button
              onClick={() => addToCart(product)}
              rounded={"lg"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg="gray.900"
              color="white"
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>
            {isWishListed ? (
              <Button
                onClick={() => addToWishlist(product)}
                rounded={"lg"}
                w={"full"}
                mt={0}
                size={"lg"}
                py={"7"}
                bg="gray.300"
                color="gray.400"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                <FaHeart size={24} style={{ margin: "10px", fill: "red" }} /> WishListed
              </Button>
            ) : (
              <Button
                onClick={() => addToWishlist(product)}
                rounded={"lg"}
                w={"full"}
                mt={0}
                size={"lg"}
                py={"7"}
                bg="gray.100"
                color="gray.500"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                <FaHeart size={24} style={{ margin: "10px", fill: "gray" }} /> Add to WishList
              </Button>
            )}
            <Button onClick={() => resetCart()}>Reset Cart </Button>
            <Stack direction="row" alignItems="center" justifyContent={"center"}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  );
}

export default ProductDetail;
