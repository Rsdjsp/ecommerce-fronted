import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const link = defineStyle({
  bg: "brand.500",
  color: "white",
  _hover: {
    bg: "brand.600",
    _disabled: {
      bg: "brand.500",
    },
  },

  _dark: {
    
    color: "white",
    _hover: {
      bg: "brand.300",
      _disabled: {
        bg: "brand.400",
      },
    },
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "16px",
  },
  defaultProps: {
    size: "md",
    variant: "link",
    colorScheme: "link",
  },
  variants: { link },
});
