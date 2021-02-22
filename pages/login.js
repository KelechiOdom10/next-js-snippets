import {
	Box,
	Heading,
	useColorMode,
	Flex,
	Link,
	Button,
	ButtonGroup,
	IconButton,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ThemeToggler from "../components/ThemeToggler";
import cookie from "cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function LoginArea() {
	const { colorMode } = useColorMode();
	const router = useRouter();

	return (
		<Layout title="Snippets | Sign in" description="Snippets Sign in Page">
			<Flex
				flexDir="column"
				h="100vh"
				maxWidth={{ base: "90%", md: "70%" }}
				m="0 auto"
			>
				<Flex my={10} align="center" justify="space-between">
					<ButtonGroup
						size="sm"
						isAttached
						variant="outline"
						colorScheme={colorMode === "dark" ? "teal" : "black"}
						onClick={() => router.back()}
					>
						<IconButton
							fontWeight="bold"
							aria-label="Add to friends"
							fontSize={{ base: "xs", md: "sm" }}
							icon={<ArrowBackIcon />}
						/>
						<Button
							mr="-px"
							fontWeight="bold"
							fontSize={{ base: "xs", md: "sm" }}
						>
							Back
						</Button>
					</ButtonGroup>

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
		</Layout>
	);
}

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

	return { props: {} };
};
