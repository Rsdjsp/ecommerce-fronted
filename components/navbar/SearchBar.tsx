import React from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch } from "@/redux/hooks";
import { filterData } from "@/redux/slices/product-slice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input
          type="tl"
          placeholder="Search"
          onChange={(e) => dispatch(filterData(e.target.value))}
        />
      </InputGroup>
    </Stack>
  );
}
