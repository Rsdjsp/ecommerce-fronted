"use client";

import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { useAppSelector } from "@/redux/hooks";
import { selectProducts } from "@/redux/slices/product-slice";
import Link from "next/link";
import { color } from "framer-motion";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const { products, loading } = useAppSelector(selectProducts);

  const cards = products.slice(3, 9);

  return (
    <Box
      position={"relative"}
      height={"500px"}
      maxW="100vw"
      overflow={"hidden"}
      p={6}
      px={10}
      mb={6}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {loading ? (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Spinner color="brand.500" size="xl" />
        </Flex>
      ) : (
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height={"450px"}
              position="relative"
              backgroundPosition="init"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}
              rounded="lg"
            >
              <Container size="container.lg" height="400px" position="relative">
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"lg"}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                >
                  <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                    {card.name}
                  </Heading>
                  <Link
                    href={`/products/${card.id}`}
                    style={{ margin: "auto" }}
                  >
                    <Text
                      fontSize="4xl"
                      color="blue.200"
                      fontWeight="bolder"
                      _hover={{ color: "blue.100" }}
                    >
                      Go Shopping
                    </Text>
                  </Link>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
}
