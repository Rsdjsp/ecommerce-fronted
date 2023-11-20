import { Product } from "@/types/product";
import { CardBody, Stack, Heading, Card, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface CardProps {
  gridArea?: string;
  productData: Product;
}

export default function ProductCard({ gridArea, productData }: CardProps) {
  return (
    <Link
      style={{ width: "100%", minHeight: "100%", gridArea: gridArea }}
      href={`/products/${productData.id}`}
    >
      <Card
        w="100%"
        rounded="lg"
        overflow="hidden"
        _hover={{
          border: "2px inset  var(--chakra-colors-blue-100)",
        }}
        h="100%"
      >
        <CardBody
          cursor="pointer"
          bgImg={`url(${productData.image})`}
          backgroundRepeat="no-repeat"
          bgPos={"initial"}
          bgSize={"cover"}
          display="flex"
          roundedTop="lg"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
          p={0}
        >
          <Stack mt="auto" w="100%" py={2} px={4}>
            <Heading size="md">{productData.name}</Heading>
            <Text color="blue.200" fontWeight="bold" fontSize="2xl">
              {`$ ${productData.price} usd`}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}
