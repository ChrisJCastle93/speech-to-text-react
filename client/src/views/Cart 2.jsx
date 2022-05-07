import React, { useState } from "react";
import { Box, Stack, Heading, Flex, HStack, Link } from "@chakra-ui/react";
import { CartItem } from "../components/CartItem";

export default function Cart() {
  let [cartItems, setCartItems] = useState([]);

  const fakeCart = [
    {
      id: 1,
      image:"https://www.fillmurray.com/360/360",
      name:"Bill Murray",
    },
    {
      id: 2,
      image:"https://www.fillmurray.com/370/370",
      name:"Bill Murray 2",
    },
    {
      id: 3,
      image:"https://www.fillmurray.com/380/380",
      name:"Bill Murray 3",
    },
  ];

  localStorage.setItem("cart", JSON.stringify(fakeCart));
  const cart = localStorage.getItem("cart");
  const cartData = JSON.parse(cart);
  console.log("CARTDATA", cartData);

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
              Shopping Cart (3 items)
            </Heading>

            <Stack spacing="6">
              {cartData.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            {/* <CartOrderSummary /> */}
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
