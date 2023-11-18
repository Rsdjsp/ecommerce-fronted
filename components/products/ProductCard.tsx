import {
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Card,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface CardProps {
  gridArea: string;
}

export default function ProductCard({ gridArea }: CardProps) {
  return (
    <Card
      gridArea={gridArea}
      w="100%"
      rounded="lg"
      overflow="hidden"
      _hover={{
        border: "2px inset  var(--chakra-colors-blue-100)",
      }}
    >
      <CardBody
        cursor="pointer"
        bgImg={
          "url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)"
        }
        backgroundRepeat="no-repeat"
        bgPos={"center"}
        bgSize={"cover"}
        display="flex"
        roundedTop="lg"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
        p={0}
      >
        <Stack mt="auto" w="100%" py={2} px={4}>
          <Heading size="md">Living room Sofa</Heading>
          <Text color="blue.200" fontWeight="bold" fontSize="2xl">
            $450.00 USD
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
