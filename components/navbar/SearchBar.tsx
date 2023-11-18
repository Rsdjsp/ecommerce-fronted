import React from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input type="tl" placeholder="Search" />
      </InputGroup>
    </Stack>
  );
}
