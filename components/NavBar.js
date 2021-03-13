import {
	Flex,
	Image,
	Link,
	Text,
	Button,
	Box,
	IconButton,
} from "@chakra-ui/react";
import React from "react";
import ThemeToggler from "./ThemeToggler";
import { useRouter } from "next/router";
import Logo from "./Logo";
import { IoMdClose, IoMdMenu } from "react-icons/io";

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

export default function NavBar({ noDisplay }) {
	const [show, setShow] = React.useState(false);
	const router = useRouter();
	const handleToggle = () => setShow(!show);

	return (
		<Flex
			as="nav"
			py={5}
			px={{ base: 6, md: 16 }}
			justify="space-between"
			justifyItems="center"
			wrap="wrap"
			align="center"
			color="teal"
			boxShadow={{ base: show ? "md" : "none", md: "none" }}
		>
			<Logo
				height="2.25rem"
				fill="teal"
				onClick={() => router.push("/")}
				cursor="pointer"
			/>

			<Box display={{ base: "flex", md: "none" }} alignItems="center">
				<ThemeToggler />
				<IconButton
					icon={show ? <IoMdClose fill="teal" /> : <IoMdMenu fill="teal" />}
					variant="unstyled"
					onClick={handleToggle}
					transition="ease-in"
					fontSize="24px"
					display="inline-flex"
					aria-label={show ? "Close Navbar" : "Open Navbar"}
				/>
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
					<MenuItems path="/">Home</MenuItems>
					<MenuItems path="/about">About</MenuItems>
					<MenuItems path="mailto:kelechi.odom@yahoo.com">Contact</MenuItems>

					<Button
						color="teal.800"
						_hover={{ bgColor: "teal.100", color: "none" }}
						bg="teal.50"
						rounded="md"
						size={{ base: "xs", md: "sm" }}
						fontWeight="bold"
						mt={{ base: 4, md: 0 }}
						px={4}
						py={2}
						display={noDisplay && "none"}
						mr={{ base: 0, md: 3 }}
						onClick={() => router.push("/signup")}
					>
						Sign up
					</Button>
				</Flex>
			</Box>
		</Flex>
	);
}
