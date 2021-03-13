import {
	Flex,
	Avatar,
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
import Logo from "./Logo";

export default function UserNavBar() {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData("user");
	const router = useRouter();

	return (
		<Flex
			as="nav"
			py={3}
			px={{ base: 8, md: 16 }}
			mt={2}
			justify="space-between"
			justifyItems="center"
			wrap="wrap"
			align="center"
			color="teal"
		>
			<Logo
				height="2.25rem"
				fill="teal"
				onClick={() => router.push("/")}
				cursor="pointer"
			/>
			<Flex flexDir="row" align="center">
				<ThemeToggler align="center" mr={3} />
				<Menu>
					<Avatar
						as={MenuButton}
						bg="teal.500"
						size="sm"
						cursor="pointer"
						_focus={{ boxShadow: "outline" }}
					/>
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
	);
}
