import { Alert, AlertDescription, Flex } from "@chakra-ui/react";
import UserNavBar from "../../components/UserNavBar";
import cookie from "cookie";
import { ReactQueryDevtools } from "react-query/devtools";
import { fetchSnippetById } from "../../services/api";
import { useQuery, useQueryClient } from "react-query";
import { SpinnerIcon } from "@chakra-ui/icons";
import EditForm from "../../components/EditForm";
import Layout from "../../components/Layout";

export const getServerSideProps = async ({ req, params }) => {
	const id = params.id;
	const parseCookies = req => {
		return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
	};

	const isLoggedIn = parseCookies(req);

	if (!isLoggedIn["auth"]) {
		res.writeHead(302, { Location: "/" });
		res.end();
	}

	const snippet = await fetchSnippetById(id);

	return {
		props: {
			snippet,
			id,
		},
	};
};

export default function UpdateSnippet({ snippet, id }) {
	if (!id) {
		return <></>;
	}

	const queryClient = useQueryClient();

	const { error, data, isLoading } = useQuery(
		["snippet", id],
		() => fetchSnippetById(id),
		{
			initialData: () => {
				if (queryClient.getQueryData(["snippet", id], { exact: true })) {
					return queryClient.getQueryData(["snippet", id], { exact: true });
				} else {
					return snippet;
				}
			},
			refetchOnWindowFocus: false,
		}
	);

	queryClient.getQueryData("token");
	queryClient.getQueryData("user");

	return (
		<Layout
			title="Snippets | Edit Page - edit your code snippets"
			description="Snippets Edit Page"
		>
			<Flex flexDir="column" h="100vh" m="0 auto">
				<UserNavBar />
				{error && (
					<Alert status="error">
						<AlertDescription>{error.message}, Please refresh</AlertDescription>
					</Alert>
				)}
				{isLoading && (
					<Flex align="center" justify="center">
						<SpinnerIcon color="teal" />
					</Flex>
				)}
				{data && <EditForm snippet={data} />}
				<ReactQueryDevtools />
			</Flex>
		</Layout>
	);
}
