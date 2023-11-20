import React, { useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts, selectProducts } from "@/redux/slices/product-slice";

export default function Collection() {
  const dispatch = useAppDispatch();
  const { products, loading, filter } = useAppSelector(selectProducts);
  const filterProducts = products.filter((product) =>
    product.name!.includes(filter)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Flex
      minH={"100vh"}
      py={6}
      px={8}
      w={"full"}
      gap={6}
      flexWrap={"wrap"}
      justifyContent="center"
    >
      {loading ? (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Spinner color="brand.500" size="xl" />
        </Flex>
      ) : (
        products.slice(29, 47).map((product, index) => (
          <Box w={"350px"} h={"400px"} key={index}>
            <ProductCard productData={product} />
          </Box>
        ))
      )}
    </Flex>
  );
}
