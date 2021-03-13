import { Heading, Flex } from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import ThemeToggler from "../components/ThemeToggler";
import cookie from "cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

export default function LoginArea() {
	const router = useRouter();

	return (
		<Layout
			title="Snippets | Sign up"
			description="Snippets Sign up Page"
			minHeight="100vh"
		>
			<Flex
				flexDir="column"
				maxWidth={{ base: "90%", md: "80%" }}
				m="0 auto"
				pb="150px"
			>
				<Flex mb={4} mt={2} align="center" justify="space-between">
					<Logo
						height="2.25rem"
						fill="teal"
						onClick={() => router.push("/")}
						cursor="pointer"
					/>
					<ThemeToggler />
				</Flex>
				<Flex
					flexDir="column"
					borderWidth={1}
					py={3}
					px={6}
					borderRadius={4}
					h="auto"
					textAlign="center"
					boxShadow="lg"
				>
					<Heading mt={4} fontSize={["xl", "2xl", "3xl", "4xl"]}>
						Sign up for an account
					</Heading>
					<SignupForm />
				</Flex>
			</Flex>
			<Footer />
		</Layout>
	);
}

export const getServerSideProps = async ({ req }) => {
	const parseCookies = req => {
		return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
	};

	const isLoggedIn = parseCookies(req);

	if (isLoggedIn["auth"]) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		};
	}
	return { props: {} };
};
