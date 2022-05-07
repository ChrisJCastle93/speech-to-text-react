import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Heading, Flex, HStack, Text } from "@chakra-ui/react";
import { CartItem } from "../../components/cart/CartItem";
import { CartOrderSummary } from "../../components/cart/CartOrderSummary";
import axios from "axios";

//   const fakeCart = [
//     {
//       id: 1,
//       image: "https://www.fillmurray.com/360/360",
//       name: "Bill Murray",
//       quantity: 1,
//       price: 5,
//     },
//     {
//       id: 2,
//       image: "https://www.fillmurray.com/370/370",
//       name: "Bill Murray 2",
//       quantity: 1,
//       price: 10,
//     },
//     {
//       id: 3,
//       image: "https://www.fillmurray.com/380/380",
//       name: "Bill Murray 3",
//       quantity: 1,
//       price: 20,
//     },
//   ];

export default function Cart() {
  let [cartData, setCartData] = useState([]);

  const onChangeQuantity = (value) => {
    const idToFilter = value.getAttribute("data-id");

    const copiedCart = [...cartData];
    // eslint-disable-next-line eqeqeq
    copiedCart.find((x) => x.id == idToFilter).quantity = value.value;

    setCartData(copiedCart);

    localStorage.setItem("cart", JSON.stringify(copiedCart));
  };

  const onClickDelete = (value) => {
    const copiedCart = [...cartData];

    const updatedCart = copiedCart.filter((x) => x.id !== value);

    setCartData(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // const resetCart = () => {
  //   localStorage.setItem("cart", JSON.stringify(fakeCart));
  //   const cart = localStorage.getItem("cart");
  //   const parsedCart = JSON.parse(cart);
  //   setCartData(parsedCart);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalPrice = 0;

    cartData.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
    });

    axios
      .post("http://localhost:5005/api/payments/create-checkout-session", { cartTotal: totalPrice.toFixed(2) })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cart);
    setCartData(parsedCart);
  }, []);

  return (
    <div>
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
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
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({cartData.length} items)
            </Heading>

            <Stack spacing="6">
              {cartData.map((item) => (
                <CartItem key={item.id} {...item} onClickDelete={onClickDelete} onChangeQuantity={onChangeQuantity} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary cartData={cartData} handleSubmit={handleSubmit} />
            <HStack mt="6" fontWeight="semibold">
              <Text>or</Text>
              <Link to="/">
                <Text color="blue.500">Continue Shopping</Text>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </div>
  );
}
