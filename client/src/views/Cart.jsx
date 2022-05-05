import React, { useState, useEffect } from "react";
import { Box, Stack, Heading, Flex, HStack, Link, Button } from "@chakra-ui/react";
import { CartItem } from "../components/CartItem";
import { CartOrderSummary } from "../components/CartOrderSummary";

export default function Cart() {
  let [cartData, setCartData] = useState([]);

  const onChangeQuantity = (value) => {
    const searchValue = value.getAttribute("data-id");
    console.log('SEARCH VALUE', searchValue)
    const copiedCart = [...cartData];
    console.log('copiedCart', copiedCart)
    copiedCart.find((x) => x.id == searchValue).quantity = value.value
    setCartData(copiedCart);
    localStorage.setItem("cart", JSON.stringify(copiedCart));
  };

  const onClickDelete = (value) => {
    const copiedCart = [...cartData];
    const updatedCart = copiedCart.filter((x) => x.id !== value);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const resetCart = () => {
    const fakeCart = [
      {
        id: 1,
        image: "https://www.fillmurray.com/360/360",
        name: "Bill Murray",
        quantity: 1,
        price: 5,
      },
      {
        id: 2,
        image: "https://www.fillmurray.com/370/370",
        name: "Bill Murray 2",
        quantity: 1,
        price: 10,
      },
      {
        id: 3,
        image: "https://www.fillmurray.com/380/380",
        name: "Bill Murray 3",
        quantity: 1,
        price: 20,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(fakeCart));
    const cart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cart);
    setCartData(parsedCart);
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    console.log(cart)

    // const newCart = [...cart]
    const parsedCart = JSON.parse(cart);
    // setCartData(newCart);
    setCartData(parsedCart)
  }, []);

  console.log("CART, cartData", cartData);

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
            <Button onClick={resetCart}>Reset Cart</Button>

            <Stack spacing="6">
              {cartData.map((item) => (
                <CartItem key={item.id} {...item} onClickDelete={onClickDelete} onChangeQuantity={onChangeQuantity} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary cartData={cartData} />
            <HStack mt="6" fontWeight="semibold">
              {/* <p>or</p> */}
              {/* <Link color={mode("blue.500", "blue.200")}>Continue shopping</Link> */}
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </div>
  );
}
