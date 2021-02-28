import Head from "next/head";
import UserNavbar from "../components/UserNavBar";
import cookie from "cookie";
import { SpinnerIcon } from "@chakra-ui/icons";
import { Alert, AlertDescription, Flex } from "@chakra-ui/react";
import Welcome from "../components/Welcome";
import { useQuery, useQueryClient } from "react-query";
import TabsList from "../components/Tabs";
import { ReactQueryDevtools } from "react-query/devtools";
import { fetchAllSnippets } from "../services/api";
import Layout from "../components/Layout";

export const getServerSideProps = async ({ req }) => {
	const parseCookies = async req => {
		return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
	};

	const isLoggedIn = await parseCookies(req);

	if (!isLoggedIn["auth"]) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const user = isLoggedIn.auth.split(";")[1];
	const snippets = await fetchAllSnippets();

	return {
		props: {
			user: user,
			token: isLoggedIn.auth.split(";")[0],
			snippets: snippets ? snippets : null,
		},
	};
};

export default function Main({ user, token, snippets }) {
	let resolvedUser = JSON.parse(user);
	const queryClient = useQueryClient();
	const { error, data, isLoading } = useQuery("snippets", fetchAllSnippets, {
		initialData: () => {
			if (queryClient.getQueryData("snippets")) {
				return queryClient.getQueryData("snippets");
			} else {
				return snippets;
			}
		},
		staleTime: 30000,
	});
	const { data: updatedUser } = useQuery("user", () => resolvedUser, {
		initialData: () => resolvedUser,
		staleTime: 1000 * 3610,
	});
	const { data: userToken } = useQuery("token", () => token, {
		initialData: () => token,
		staleTime: 1000 * 3610,
	});

	return (
		<Layout
			title="Snippets | Home Page - view, create, edit, copy and delete code snippets"
			description="Snippets Home Page where you can view, create, edit, copy and delete code snippets"
		>
			<UserNavbar />
			<Welcome />
			{error && (
				<Alert status="error">
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			)}
			{isLoading && (
				<Flex align="center" justify="center">
					<SpinnerIcon color="teal" />
				</Flex>
			)}
			{data && <TabsList snippets={data} />}
			<ReactQueryDevtools />
		</Layout>
	);
}
