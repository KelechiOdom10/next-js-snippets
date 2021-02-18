import Head from "next/head";
import Navbar from "../components/NavBar";
import SnippetList from "../components/SnippetList";
import Hero from "../components/Hero";
import { fetchAllSnippets } from "../services/api";
import { useQuery } from "react-query";
import { Alert, AlertDescription, Box } from "@chakra-ui/react";
import cookie from "cookie";

export const getServerSideProps = async ({ req }) => {
	const parseCookies = req => {
		return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
	};

	const isLoggedIn = parseCookies(req);

	if (isLoggedIn.auth) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		};
	}

	const snippets = await fetchAllSnippets();
	return {
		props: { snippets: snippets ? snippets : [] },
	};
};

export default function Home({ snippets }) {
	const { error, data } = useQuery("snippets", fetchAllSnippets, {
		initialData: () => {
			return snippets;
		},
	});

	return (
		<Box>
			<Head>
				<title>Snippets</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Hero />
			{error && (
				<Alert status="error">
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			)}
			{data && (
				<SnippetList
					snippets={data}
					disabled={true}
					w={{ base: "90%", md: "65%", lg: "60%" }}
					mx="auto"
				/>
			)}
		</Box>
	);
}
