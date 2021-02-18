import { Flex } from "@chakra-ui/react";
import CreateForm from "../components/CreateForm";
import UserNavBar from "../components/UserNavBar";
import cookie from "cookie";
import { ReactQueryDevtools } from "react-query/devtools";

export default function CreateSnippet() {
	return (
		<Flex flexDir="column" h="100vh" m="0 auto">
			<UserNavBar />
			<CreateForm />
			<ReactQueryDevtools />
		</Flex>
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
