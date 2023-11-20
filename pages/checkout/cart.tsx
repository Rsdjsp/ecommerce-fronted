import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart, getUser, removeCart } from "@/redux/slices/user-slice";
import {
  Box,
  Flex,
  Text,
  Button,
  Grid,
  GridItem,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, loading, user } = useAppSelector(getUser);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user.id]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id: string) => {
    dispatch(
      removeCart({
        userId: user.id,
        productId: id,
      })
    );
    dispatch(fetchCart(user.id));
  };

  return (
    <>
      {loading || cart === null ? (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Spinner color="brand.500" size="xl" />
        </Flex>
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={6}
          alignSelf="center"
          w="100%"
          mx={"10%"}
          minH="80vh"
        >
          <GridItem>
            {cart.map((item) => (
              <Flex key={item.id} justify="space-between" mb={4} w="100%">
                <Box w="100px" mr="20px">
                  <Image rounded="lg" src={`${item.image}`} alt="item.name" />
                </Box>
                <Text my="auto" mr="30px" display="flex" flexDir="column">
                  {item.name} x {item.quantity}
                  <Text as="span">{`$${item.price} c/u`}</Text>
                </Text>
                <Text my="auto">${item.price * item.quantity}</Text>
                <Button
                  colorScheme="red"
                  size="sm"
                  my="auto"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </GridItem>
          <GridItem display="flex">
            <Flex w="100%" flexDir="column" my="auto">
              <Box ml="auto" mb={4}>
                <Text fontSize="xl">
                  Total: ${parseFloat(totalPrice.toFixed(2))}
                </Text>
              </Box>
              <Button colorScheme="teal" ml="auto" size="md" w="50%">
                Checkout
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      )}
    </>
  );
}
