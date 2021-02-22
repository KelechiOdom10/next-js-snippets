import {
	Flex,
	Avatar,
	Image,
	MenuItem,
	Menu,
	MenuButton,
	MenuGroup,
	MenuList,
	MenuDivider,
	Box,
} from "@chakra-ui/react";
import React from "react";
import ThemeToggler from "./ThemeToggler";
import { logout } from "../services/api";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export default function UserNavBar() {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData("user");
	const router = useRouter();

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
			>
				<Flex align="center" h="60px">
					<Image
						src="https://seeklogo.com/images/C/coding-logo-553EFA7061-seeklogo.com.png"
						h="60%"
						alt="Snippets Logo"
						onClick={() => router.push("/")}
						cursor="pointer"
					/>
				</Flex>
				<Flex flexDir="row" align="center">
					<ThemeToggler align="center" mr={3} />
					<Menu>
						<MenuButton as={Avatar} bg="teal.500" size="sm" cursor="pointer" />
						<MenuList>
							<MenuGroup title="Profile">
								<MenuItem>
									<Avatar
										bg="teal.500"
										size="sm"
										name={user?.username}
										mr="12px"
										color="white"
									/>
									<Box as="span" fontSize={{ base: "xs", md: "md" }}>
										My Account
									</Box>
								</MenuItem>
							</MenuGroup>
							<MenuDivider />
							<MenuGroup>
								<MenuItem
									fontSize={{ base: "sm", md: "md" }}
									onClick={() => router.push("/home")}
								>
									Home
								</MenuItem>
								<MenuItem
									fontSize={{ base: "sm", md: "md" }}
									onClick={() => router.push("/about")}
								>
									About
								</MenuItem>
								<MenuItem
									fontSize={{ base: "sm", md: "md" }}
									onClick={e => {
										window.location.href = "mailto:kelechi.odom@yahoo.com";
										e.preventDefault();
									}}
								>
									Contact
								</MenuItem>
								<MenuItem fontSize={{ base: "sm", md: "md" }} onClick={logout}>
									Logout
								</MenuItem>
							</MenuGroup>
						</MenuList>
					</Menu>
				</Flex>
			</Flex>
		</>
	);
}
