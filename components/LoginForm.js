import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
  Text,
  Button,
  Link,
  useColorMode,
} from "@chakra-ui/react";

export default function LoginForm() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box my={8} mx={4} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email address" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="3rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                colorScheme={colorMode === "dark" ? "teal" : "gray"}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Box>
          <Text>
            Don't have an account?{" "}
            <Link color="teal.500" fontWeight="bold" href="#">
              Sign up
            </Link>
          </Text>
        </Box>

        <Button fontWeight="bold" colorScheme="teal" width="full" mt={4}>
          Sign In
        </Button>
      </form>
    </Box>
  );
}
