import { Grid } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./products/ProductCard";

export default function Container() {
  return (
    <Grid
      templateColumns={"repeat(5, 1fr)"}
      templateRows={"repeat(2, 1fr)"}
      columnGap={4}
      rowGap={4}
          py={4}
          px={10}
      w={"100vw"}
      minH={"120vh"}
    >
      <ProductCard gridArea={"1 / 1 / 3 / 4"} />
      <ProductCard gridArea={"2 / 4 / 3 / 6"} />
      <ProductCard gridArea={"1 / 4 / 2 / 6"} />
    </Grid>
  );
}
