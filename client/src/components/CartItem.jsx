import { CloseButton, Flex, Select, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

const QuantitySelect = (props) => {


  return (
    <Select maxW="64px" aria-label="Select quantity" focusBorderColor={useColorModeValue("blue.500", "blue.200")} {...props}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = (props) => {
  const { isGiftWrapping, name, description, quantity, image, currency, price, onChangeQuantity, onClickDelete, id } = props;

  console.log('cart item id', id)

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} description={description} image={image} id={id} isGiftWrapping={isGiftWrapping} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <QuantitySelect
          data-id={id}
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(e.currentTarget);
            // onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton aria-label={`Delete ${name} from cart`} onClick={ () => onClickDelete(id)} />
      </Flex>

      {/* Mobile */}
      {/* <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        {/* <PriceTag price={price} currency={currency} /> */}
      {/* </Flex> */}
    </Flex>
  );
};
