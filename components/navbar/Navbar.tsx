"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosCart } from "react-icons/io";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/slices/user-slice";

interface NavLinkProps {
  label: string;
  url: string;
}

const Links = [
  { label: "All", url: "/products/all" },
  { label: "Hot Sales", url: "/products/hot-sales" },
  { label: "Collection", url: "/products/collection" },
];

const NavLink = (props: NavLinkProps) => {
  const { label, url } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={url}
    >
      {label}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user}= useAppSelector(getUser);

  const router = useRouter();

  return (
    <>
      <Box
        as="nav"
        px={8}
        minW="100%"
        position="fixed"
        bg="gray.100"
        zIndex={20}
        h={20}
      >
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href="/">ECOMMERCE APP</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.label} label={link.label} url={link.url} />
              ))}
            </HStack>
          </HStack>
          {router.pathname !== "/" && <SearchBar />}
          <Flex alignItems={"center"}>
            <Link href="/checkout/cart">
              <Button mr="20px">
                <Icon as={IoIosCart} />
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  name={user.name}
                  border="1px solid white"
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    localStorage.clear();
                    router.replace("/auth/login");
                  }}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} bg="gray.100">
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.label} label={link.label} url={link.url} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
