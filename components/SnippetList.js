import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Flex,
	Input,
	Select,
} from "@chakra-ui/react";
import React, { useState } from "react";

import Snippet from "./Snippet";

export default function SnippetList({ snippets, disabled, ...props }) {
	let filteredSnippets = snippets;
	const [searchValue, setSearchValue] = useState("");
	const [language, setLanguage] = useState("");

	if (searchValue.length > 0) {
		filteredSnippets = filteredSnippets.filter(
			snippet =>
				snippet.name.toLowerCase().includes(searchValue) ||
				snippet.description.toLowerCase().includes(searchValue) ||
				snippet.language.toLowerCase().includes(searchValue)
		);
	}

	const resetFilters = () => {
		setLanguage("");
		setSearchValue("");
		filteredSnippets = snippets;
	};

	return (
		<Box mb={8} {...props}>
			<Flex flexDir="column" align="center" my={6}>
				<Input
					type="text"
					value={searchValue}
					onChange={e => setSearchValue(e.target.value.toLowerCase())}
					placeholder="Search snippets by name, description or language"
					_placeholder={{
						fontStyle: "italic",
						fontSize: { base: "xs", md: "sm", lg: "md" },
					}}
					fontSize={{ base: "sm", md: "sm", lg: "md" }}
				/>
			</Flex>

			<Flex my={6} align="center">
				<Select
					placeholder="Filter by Language"
					aria-label="Language dropdown"
					variant="filled"
					value={language}
					width="45%"
					overflowX="hidden"
					fontSize={{ base: "sm", md: "sm", lg: "md", xl: "lg" }}
					fontWeight="semibold"
					onChange={e => setLanguage(e.currentTarget.value)}
					isRequired
				>
					<option value="JavaScript">JavaScript</option>
					<option value="HTML">HTML</option>
					<option value="CSS">CSS</option>
					<option value="Python">Python</option>
					<option value="SQL">SQL</option>
					<option value="TypeScript">TypeScript</option>
					<option value="XML">XML</option>
					<option value="JSX">JSX</option>
					<option value="PHP">PHP</option>
				</Select>
				<Button
					colorScheme="teal"
					variant="outline"
					ml={5}
					rounded="md"
					borderWidth={2}
					fontSize={{ base: "sm", md: "sm", lg: "md", xl: "lg" }}
					fontWeight="semibold"
					onClick={resetFilters}
				>
					Reset filters
				</Button>
			</Flex>

			{filteredSnippets < 1 ||
			filteredSnippets.filter(snippet =>
				language ? snippet.language === language : true
			) < 1 ? (
				<Alert
					status="info"
					fontSize={{ base: "sm", md: "sm", lg: "md", xl: "lg" }}
				>
					<AlertIcon />
					Oops no snippets returned, please refine your search!
				</Alert>
			) : (
				snippets &&
				filteredSnippets
					.filter(snippet => (language ? snippet.language === language : true))
					.map(snippet => (
						<Snippet
							key={snippet.id}
							snippet={snippet}
							disabled={disabled}
							setLanguage={setLanguage}
						/>
					))
			)}
		</Box>
	);
}
