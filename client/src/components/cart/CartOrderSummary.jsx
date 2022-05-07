import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";


export const CartOrderSummary = (props) => {
  let { cartData } = props;
  console.log(cartData)

  let totalPrice = 0

  cartData.forEach(item => {
    const itemTotal = item.price * item.quantity
    totalPrice += itemTotal
  })

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      <Button onClick={(e) => props.handleSubmit(e)} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
        Checkout
      </Button>
    </Stack>
  );
};
