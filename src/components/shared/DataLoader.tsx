
import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const DataLoader = () => {
  return (
    <Flex justify="center" align="center" pt={40}>
      <Flex direction="column" justify="center" align="center">
        <RotatingSquare
          height="100"
          width="100"
          color="#04235c"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <Heading as="h2" fontSize="2xl" mt={3}>
         loading Data ...
        </Heading>
      </Flex>
    </Flex>
  );
};

export default DataLoader;
