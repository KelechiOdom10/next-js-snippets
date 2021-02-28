import { Box, Heading, Flex, Image } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import ThemeToggler from "../components/ThemeToggler";
import cookie from "cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function LoginArea() {
	const router = useRouter();

	return (
		<Layout
			title="Snippets | Sign in"
			description="Snippets Sign in Page"
			minHeight="100vh"
		>
			<Flex
				flexDir="column"
				maxWidth={{ base: "90%", md: "70%" }}
				m="0 auto"
				pb="100px"
			>
				<Flex mb={8} align="center" justify="space-between">
					<Flex align="center" h="60px">
						<Image
							src="/coding-logo.png"
							h="60%"
							alt="Snippets Logo"
							cursor="pointer"
							onClick={() => router.push("/")}
						/>
					</Flex>

					<ThemeToggler />
				</Flex>
				<Box
					borderWidth={1}
					py={3}
					px={6}
					borderRadius={4}
					h="auto"
					textAlign="center"
					boxShadow="lg"
				>
					<Heading mt={4} fontSize={["xl", "2xl", "3xl", "4xl"]}>
						Sign In to Your Account
					</Heading>
					<LoginForm />
				</Box>
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
	if (!isLoggedIn["auth"]) {
		res.writeHead(302, { Location: "/home" });
		res.end();
	}

	return { props: {} };
};
