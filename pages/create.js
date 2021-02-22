import { Flex } from "@chakra-ui/react";
import CreateForm from "../components/CreateForm";
import UserNavBar from "../components/UserNavBar";
import cookie from "cookie";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/Layout";

export default function CreateSnippet() {
	return (
		<Layout
			title="Snippets | Create Page - create code snippets"
			description="Snippets Create Page"
		>
			<Flex flexDir="column" h="100vh" m="0 auto">
				<UserNavBar />
				<CreateForm />
				<ReactQueryDevtools />
			</Flex>
		</Layout>
	);
}

export const getServerSideProps = async ({ req }) => {
	const parseCookies = req => {
		return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
	};

	const isLoggedIn = parseCookies(req);

	if (!isLoggedIn.auth) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return { props: {} };
};
