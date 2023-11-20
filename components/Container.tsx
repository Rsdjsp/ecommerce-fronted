import { Grid } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./products/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { selectProducts } from "@/redux/slices/product-slice";
import { Product } from "@/types/product";

export default function Container() {
  const { products } = useAppSelector(selectProducts);

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
      <ProductCard
        productData={products[0] ?? ({} as Product)}
        gridArea={"1 / 1 / 3 / 4"}
      />
      <ProductCard
        productData={products[1] ?? ({} as Product)}
        gridArea={"2 / 4 / 3 / 6"}
      />
      <ProductCard
        productData={products[2] ?? ({} as Product)}
        gridArea={"1 / 4 / 2 / 6"}
      />
    </Grid>
  );
}
