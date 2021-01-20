import {
	Box,
	Heading,
	Text,
	Button,
	Link,
	Flex,
	Image,
} from "@chakra-ui/react";
import { Link as NextLink } from "next/link";
import React from "react";

export default function Welcome(props) {
	return (
		<Flex mx="auto" mt={4} maxW="85%" align="center">
			<Box p={5} mx={3} flexGrow={1}>
				<Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
					Everyday Code Snippets
				</Heading>
				<Text
					mt={3}
					fontSize={{ base: "md", md: "md", lg: "lg" }}
					fontWeight={500}
				>
					Please Login to create and browse snippets you use everyday in Web
					development!
				</Text>
				<Link as={NextLink} _hover={{ textDecoration: "none" }} href="/login">
					<Button
						colorScheme="teal"
						size={{ base: "sm", md: "md" }}
						py=".7rem"
						px={5}
						variant="outline"
						mt={6}
						rounded="sm"
						borderWidth={2}
						fontSize="lg"
						fontWeight="bold"
					>
						Login
					</Button>
				</Link>
			</Box>
			<Box display={{ base: "none", md: "flex" }}>
				<Image
					mx="auto"
					maxW="70%"
					src="https://therenegadecoder.com/wp-content/uploads/2020/05/python-dictionary-syntax.png"
					alt="Snippets Demo Screenshot"
				/>
			</Box>
		</Flex>
	);
}
