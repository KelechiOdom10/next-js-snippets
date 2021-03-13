import { Flex, Heading, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import Procedure from "./Procedure";
import { HiUsers, HiOutlineDocumentSearch, HiScissors } from "react-icons/hi";

function HowItWorks() {
	return (
		<>
			<Heading fontSize={{ base: "1.6rem", md: "3xl" }} mt={10}>
				How Does it Work?
			</Heading>
			<SimpleGrid
				columns={{ base: 1, md: 2, lg: 3 }}
				spacingX="20px"
				spacingY="20px"
				px="auto"
				mt={4}
			>
				<Procedure
					icon={HiUsers}
					header="Create account / Login"
					text="Create a user account or login to create, edit and delete your snippets"
				/>
				<Procedure
					icon={HiOutlineDocumentSearch}
					header="Browse and Create snippets"
					text="Browse existing snippets while having the ability to create yours for others to use"
				/>
				<Procedure
					icon={HiScissors}
					header="Copy snippets"
					text="Copy snippets that can be used in your codebase"
				/>
			</SimpleGrid>
		</>
	);
}

export default HowItWorks;
