import {
	Flex,
	Link,
	Box,
	Image,
	Icon,
	Heading,
	Text,
	useColorModeValue,
	Button,
	IconButton,
} from "@chakra-ui/react";

import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function Stack({ href, header, text, altText, src }) {
	return (
		<Flex
			justify="space-between"
			h="auto"
			bg={useColorModeValue("gray.50", "gray.600")}
			p={4}
			borderRadius="lg"
			my={3}
			align="center"
		>
			<Flex align="center">
				<Image
					w={{ base: "3rem", md: 20 }}
					h={{ base: "3rem", md: 20 }}
					borderRadius="full"
					sx={{ borderImageWidth: "3px", borderColor: "red.500" }}
					src={src}
					alt={altText}
					objectFit="cover"
					loading="lazy"
					decoding="async"
				/>
				<Box ml={3}>
					<Heading fontSize={{ base: "sm", md: "lg" }}>{header}</Heading>
					<Text
						fontFamily="Nunito"
						fontSize={{ base: "xs", md: "md" }}
						display={{ base: "none", md: "block" }}
					>
						{text}
					</Text>
				</Box>
			</Flex>
			<Link
				href={href}
				isExternal
				color={useColorModeValue("teal.500", "white")}
				fontFamily="Nunito"
				fontSize={{ base: "xs", md: "md" }}
				fontWeight="bold"
				_hover={{ textDecoration: "none" }}
			>
				<Button
					colorScheme="teal"
					rightIcon={<ExternalLinkIcon />}
					display={{ base: "none", md: "block" }}
				>
					Visit Site
				</Button>
				<IconButton
					colorScheme="teal"
					aria-label="Visit technology Site"
					icon={<ExternalLinkIcon />}
					display={{ base: "block", md: "none" }}
					variant="ghost"
				/>
			</Link>
		</Flex>
	);
}

export default Stack;
