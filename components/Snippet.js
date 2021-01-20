import { TriangleDownIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Flex,
	Heading,
	Button,
	Text,
	useDisclosure,
	Collapse,
	Stack,
	IconButton,
	Tag,
} from "@chakra-ui/react";
import React from "react";
import Code from "./Code";

const colorMatch = language => {
	switch (language) {
		case "JavaScript":
		case "JSX":
		case "SQL":
			return "yellow";
		case "CSS":
		case "Python":
			return "blue";
		case "HTML":
		case "XML":
		case "PHP":
			return "red";
		default:
			return "green";
	}
};

export default function Snippet({ snippet }) {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Flex
			flexDirection="column"
			w={{ base: "90%", md: "70%" }}
			mx="auto"
			rounded="sm"
			boxShadow="md"
			mt={7}
			p={2}
			borderWidth={1}
		>
			<Flex justify="space-between" p={4} align="center">
				<Heading as="h2" fontSize={["lg", "xl", "2xl"]}>
					{snippet.name}
				</Heading>
				<Tag
					fontWeight="bold"
					fontSize={["sm", "md", "md"]}
					py={2}
					px={2}
					colorScheme={colorMatch(snippet.language)}
				>
					{snippet.language}
				</Tag>
			</Flex>
			<Text px={4}>{snippet.description}</Text>
			<Button
				rightIcon={<TriangleDownIcon />}
				mx={4}
				my={4}
				w={{ base: "40%", md: "20%" }}
				onClick={onToggle}
				fontSize="sm"
				fontWeight="bold"
				colorScheme="teal"
			>
				{" "}
				Show more
			</Button>
			<Collapse in={isOpen} animateOpacity>
				<Code code={snippet.code} language={snippet.language} />
			</Collapse>
			<Stack direction="row" spacing={2} mx={5}>
				<IconButton icon={<EditIcon />} variant="ghost" color isDisabled />
				<IconButton icon={<DeleteIcon />} variant="ghost" isDisabled />
			</Stack>
		</Flex>
	);
}
