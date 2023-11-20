import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProduct, selectProducts } from "@/redux/slices/product-slice";
import { addCart, getUser } from "@/redux/slices/user-slice";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Spinner,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { loading, selectedProduct } = useAppSelector(selectProducts);
  const { user } = useAppSelector(getUser);

  useEffect(() => {
    dispatch(fetchProduct(id as string));
  }, [dispatch, id, user.id]);

  const handleAdd = () => {
    dispatch(
      addCart({
        userId: user.id,
        productId: id as string,
      })
    );
  };

  return (
    <>
      {loading || selectedProduct === null ? (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Spinner color="brand.500" size="xl" />
        </Flex>
      ) : (
        <Grid
          templateColumns="repeat(2,1fr)"
          gridTemplateRows="1fr"
          w="100%"
          overflow="hidden"
          mx={"10%"}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Box gridArea="1/1/2/2" p="10%">
            <Image
              rounded="lg"
              src={selectedProduct.image}
              alt={selectedProduct.name!}
            />
          </Box>
          <Flex gridArea="1/2/2/3" pt="10%">
            <Box p="10">
              <Box display="flex" alignItems="baseline">
                <Text
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                  fontSize="2xl"
                >
                  {selectedProduct.name}
                </Text>
              </Box>

              <Box mt={10}>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  color="white"
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct.description,
                  }}
                />
              </Box>

              <Button
                colorScheme="teal"
                width="100%"
                mt="20%"
                onClick={handleAdd}
              >
                Add to Cart
              </Button>
            </Box>
          </Flex>
        </Grid>
      )}
    </>
  );
}
