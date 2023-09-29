import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";

function Procedure({ icon, header, text }) {
  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.600")}
      flexDir="column"
      w="16em"
      p={4}
      borderRadius="md"
      mt={{ base: 4, md: 0 }}
    >
      <Icon
        as={icon}
        w={{ base: 8, md: 10 }}
        h={{ base: 8, md: 10 }}
        p={{ base: 1, md: 2 }}
        borderRadius="full"
        borderWidth={2}
        borderColor="teal.500"
        bg="white"
        color="teal.500"
      />
      <Heading as="h5" size={{ base: "sm", md: "md" }} my={3}>
        {header}
      </Heading>
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        fontFamily="Nunito"
        fontWeight="semibold"
      >
        {text}
      </Text>
    </Flex>
  );
}

export default Procedure;
