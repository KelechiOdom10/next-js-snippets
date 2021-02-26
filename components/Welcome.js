import { AddIcon } from "@chakra-ui/icons";
import {
	Heading,
	Button,
	Flex,
	Box,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

export default function Welcome() {
	const queryClient = useQueryClient();
	const { username } = queryClient.getQueryData("user");
	const router = useRouter();
	return (
		<Flex
			w={{ base: "90%", md: "65%", lg: "60%" }}
			mx="auto"
			mt={7}
			p={2}
			flexDir="column"
		>
			<Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
				Welcome{" "}
				<Box as="span" color="teal.400" fontStyle="italic">
					{" "}
					{username}
				</Box>
			</Heading>
			<Text
				mt={3}
				fontSize={{ base: "sm", md: "sm", lg: "md" }}
				fontWeight="semibold"
				color={useColorModeValue("gray.700", "gray.300")}
			>
				Create snippets for everyone to view and use!
			</Text>
			<Button
				leftIcon={<AddIcon />}
				colorScheme="teal"
				w={{ base: "49%", md: "32%", lg: "30%" }}
				variant="outline"
				mt={6}
				rounded="lg"
				borderWidth={2}
				fontSize={{ base: "xs", md: "sm", lg: "md", xl: "lg" }}
				fontWeight="bold"
				boxShadow="md"
				onClick={() => router.push("/create")}
			>
				Create Snippet
			</Button>
		</Flex>
	);
}
