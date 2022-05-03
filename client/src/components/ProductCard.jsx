import { AspectRatio, Box, Button, HStack, Image, Link, Skeleton, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Rating } from "../components/Rating";
import { PriceTag } from "../components/PriceTag";

export const ProductCard = (props) => {
  const { product, rootProps } = props;
  const { title, image, price, rating, ratings_total } = product;
  return (
    <Stack
      spacing={useBreakpointValue({
        base: "4",
        md: "5",
      })}
      {...rootProps}
    >
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={title}
            objectFit="contain"
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({
              base: "md",
              md: "xl",
            })}
          />
        </AspectRatio>
        {/* <FavouriteButton position="absolute" top="4" right="4" aria-label={`Add ${name} to your favourites`} /> */}
      </Box>
      <Stack flexGrow={1}>
        <Stack flexGrow={1} spacing="1">
          <Text flexGrow={1} fontWeight="medium" color={useColorModeValue("gray.700", "gray.400")}>
            {title}
          </Text>
          <PriceTag price={price.value} currency={price.currency} />
        </Stack>
        <HStack>
          <Rating defaultValue={rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {ratings_total} Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" isFullWidth>
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
};
