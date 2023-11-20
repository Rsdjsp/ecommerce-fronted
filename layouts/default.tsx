import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

import { Flex } from "@chakra-ui/react";

interface Props {
  children?: React.ReactElement;
}

function Default({ children }: Props) {
  return (
    <Flex minW={"100%"} flexDir={"column"} overflowX={"hidden"}>
      <Navbar />
      <Flex h="100%" marginTop={20} >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Default;
