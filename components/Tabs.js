import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

import SnippetList from "./SnippetList";
import UserSnippetList from "./UserSnippets";

function TabsList({ snippets }) {
	return (
		<Tabs
			variant="enclosed-colored"
			colorScheme="teal"
			w={{ base: "90%", md: "65%", lg: "60%" }}
			mx="auto"
			my={6}
			defaultIndex={1}
			isManual
		>
			<TabList>
				<Tab fontWeight="bold" fontSize={{ base: "sm", md: "sm", lg: "md" }}>
					All snippets
				</Tab>
				<Tab fontWeight="bold" fontSize={{ base: "sm", md: "sm", lg: "md" }}>
					My Snippets
				</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<SnippetList snippets={snippets} disabled={true} />
				</TabPanel>
				<TabPanel>
					<UserSnippetList snippets={snippets} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
}

export default TabsList;
