import {
	Box,
	Heading,
	useColorMode,
	Flex,
	Link,
	Button,
	ButtonGroup,
	IconButton,
} from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ThemeToggler from "../components/ThemeToggler";
import { Link as NextLink } from "next/link";

export default function LoginArea() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex
			flexDir="column"
			h="100vh"
			maxWidth={{ base: "80%", md: "70%" }}
			m="0 auto"
		>
			<Flex my={10} align="center" justify="space-between">
				<Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
					<ButtonGroup
						size="sm"
						isAttached
						variant="outline"
						colorScheme={colorMode === "dark" ? "teal" : "black"}
					>
						<IconButton
							fontWeight="bold"
							aria-label="Add to friends"
							icon={<ArrowBackIcon />}
						/>
						<Button mr="-px" fontWeight="bold">
							Back
						</Button>
					</ButtonGroup>
				</Link>
				<ThemeToggler />
			</Flex>
			<Box
				borderWidth={1}
				py={3}
				px={8}
				borderRadius={4}
				h="auto"
				textAlign="center"
				boxShadow="lg"
			>
				<Heading mt={4}>Sign up for an account</Heading>
				<SignupForm />
			</Box>
		</Flex>
	);
}
