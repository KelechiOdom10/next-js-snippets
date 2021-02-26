import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const FooterItem = ({ text, path, isLast }) => {
	return (
		<Link
			mr={isLast ? 0 : 3}
			fontSize={{ base: "xs", md: "sm" }}
			fontWeight="bold"
			letterSpacing="wide"
			color="white"
			href={path}
		>
			{text}
		</Link>
	);
};

const FooterButton = ({ icon, description, path }) => {
	return (
		<Link href={path} isExternal>
			<Icon
				as={icon}
				boxSize={{ base: "1.3rem", md: "1.7rem" }}
				mr={4}
				variant="none"
				color="white"
				aria-label={description}
			/>
		</Link>
	);
};

function Footer({ showList }) {
	return (
		<Flex
			as="footer"
			flexDir="column"
			align="center"
			justify="center"
			bg="teal.500"
			px="auto"
			width="100%"
			position="absolute"
			bottom="0"
			left="0"
			height="100px"
		>
			{showList && (
				<Flex align="center" justify="space-evenly" my={3}>
					<FooterItem text="Home" path="/" />
					<FooterItem text="About" path="/about" />
					<FooterItem text="Contact" path="mailto:kelechi.odom@yahoo.com" />
					<FooterItem text="Get Started" path="/signup" isLast />
				</Flex>
			)}
			<Flex mt={!showList && 2}>
				<FooterButton
					icon={AiFillLinkedin}
					description="LinkedIn Logo"
					path="https://www.linkedin.com/in/kelechi-odom-065308157/"
				/>
				<FooterButton
					icon={AiFillGithub}
					description="GitHub Logo"
					path="https://github.com/KelechiOdom10/next-js-snippets"
				/>
			</Flex>
			<Text
				fontSize={{ base: "xs", md: "sm" }}
				fontWeight="semibold"
				letterSpacing="wide"
				color="white"
				my={1}
				justifyContent="center"
			>
				<Box as="span" display="inline-block" transform="rotateY(180deg)">
					&copy;
				</Box>
				<span>
					{" "}
					Snippets | {new Date().getFullYear()}. Some rights reserved
				</span>
			</Text>
		</Flex>
	);
}

export default Footer;
