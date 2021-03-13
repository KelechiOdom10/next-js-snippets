import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import Introduction from "../components/Introduction";
import HowItWorks from "../components/HowItWorks";
import TechStack from "../components/TechStack";

export default function About() {
	return (
		<Layout
			title="Snippets | About Page"
			description="The story being the Snippets Project"
			minHeight="100vh"
		>
			<Navbar noDisplay />
			<Box pb="100px" w="80%" mx="auto">
				<Introduction />
				<HowItWorks />
				<TechStack />
			</Box>
			<Footer showList />
		</Layout>
	);
}
