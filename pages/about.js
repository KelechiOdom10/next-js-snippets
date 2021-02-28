import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { Box, Heading } from "@chakra-ui/react";

export default function About() {
	return (
		<Layout
			title="Snippets | About Page"
			description="The story being the Snippets Project"
			minHeight="100vh"
		>
			<Box pb="100px">
				{" "}
				<Heading>Coming Soon!</Heading>
			</Box>
			<Footer showList />
		</Layout>
	);
}
