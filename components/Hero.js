import {
	Box,
	Heading,
	Text,
	Button,
	Flex,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Hero() {
	const router = useRouter();
	return (
		<Flex
			mx="auto"
			mt={4}
			maxW={{ base: "90%", md: "70%", lg: "75%" }}
			align="center"
		>
			<Box p={5} mx={3} flexGrow="2">
				<Heading
					fontSize={{ base: "1.4rem", md: "3xl", lg: "4xl" }}
					lineHeight="1.2"
				>
					Code Snippets for{" "}
					<Box as="span" color="teal.400">
						developers
					</Box>
				</Heading>
				<Text
					mt={3}
					fontSize={{ base: "sm", md: "sm", lg: "md" }}
					fontWeight={500}
					color={useColorModeValue("gray.700", "gray.300")}
				>
					Home to snippets you use everyday in Web development!
				</Text>

				<Button
					colorScheme="teal"
					variant="outline"
					mt={6}
					rounded="md"
					borderWidth={2}
					fontSize={{ base: "sm", md: "sm", lg: "md" }}
					fontWeight="bold"
					onClick={() => router.push("/login")}
				>
					Login
				</Button>
			</Box>

			<Image
				mx="auto"
				maxW="50%"
				h="80%"
				src="https://therenegadecoder.com/wp-content/uploads/2020/05/python-dictionary-syntax.png"
				alt="Snippets Demo Screenshot"
				display={{ base: "none", md: "flex" }}
			/>
		</Flex>
	);
}
