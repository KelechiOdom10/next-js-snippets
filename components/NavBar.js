import { Flex, Image, Link, Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import ThemeToggler from "./ThemeToggler";
import { useRouter } from "next/router";

const MenuItems = ({ children, path }) => (
	<Text
		mt={{ base: 4, md: 0 }}
		mr={{ base: 0, md: 6 }}
		display="block"
		fontSize="sm"
		fontWeight="bold"
		letterSpacing="wide"
		align="center"
		w="100%"
	>
		<Link href={path}>{children}</Link>
	</Text>
);

const CloseIcon = () => (
	<svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
		<title>Close</title>
		<path
			fill="teal"
			d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
		/>
	</svg>
);

const MenuIcon = () => (
	<svg
		width="24px"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		fill="teal"
	>
		<title>Menu</title>
		<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
	</svg>
);

export default function NavBar() {
	const [show, setShow] = React.useState(false);
	const router = useRouter();
	const handleToggle = () => setShow(!show);

	return (
		<>
			<Flex
				as="nav"
				py={3}
				px={8}
				justify="space-between"
				wrap="wrap"
				w={{ base: "100%", md: "90%" }}
				m="0 auto"
				align="center"
				color="teal"
				boxShadow={{ base: show ? "md" : "none", md: "none" }}
			>
				<Flex align="center" h="60px">
					<Image
						src="https://seeklogo.com/images/C/coding-logo-553EFA7061-seeklogo.com.png"
						h="60%"
						alt="Snippets Logo"
						onClick={() => router.push("/")}
					/>
				</Flex>

				<Box display={{ base: "flex", md: "none" }} alignItems="center">
					<ThemeToggler mr={3} />
					<Box onClick={handleToggle} transition="ease-in" cursor="pointer">
						{show ? <CloseIcon /> : <MenuIcon />}
					</Box>
				</Box>

				<Box
					display={{ base: show ? "block" : "none", md: "block" }}
					flexBasis={{ base: "100%", md: "auto" }}
					align="center"
				>
					<Flex
						alignItems="center"
						justify={["center", "space-between", "flex-end", "flex-end"]}
						direction={["column", "column", "row", "row"]}
						pt={[0, 0, 0, 0]}
					>
						<ThemeToggler
							display={{ base: "none", md: "flex" }}
							align="center"
							mr={3}
						/>
						<MenuItems show={show} path="/">
							Home
						</MenuItems>
						<MenuItems show={show} path="/about">
							About
						</MenuItems>
						<Button
							colorScheme="teal"
							size={{ base: "xs", md: "sm" }}
							fontWeight="bold"
							mt={{ base: 4, md: 0 }}
							px={4}
							py={2}
							onClick={() => router.push("/signup")}
						>
							Sign up
						</Button>
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
