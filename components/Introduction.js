import { Heading, Text } from "@chakra-ui/layout";
import React from "react";

function Introduction() {
	return (
		<>
			<Heading fontSize={{ base: "1.6rem", md: "3xl" }} mt={4}>
				About Snippets
			</Heading>
			<Text
				my={4}
				fontFamily="Nunito"
				fontWeight="semibold"
				lineHeight="tall"
				letterSpacing="wide"
				fontSize={["sm", "sm", "md"]}
			>
				Snippets is a platform aimed at helping developers particularly new and
				incoming developers, speed up their workflow by allowing them search for
				reusable code blocks that can easily be copied and added to their
				existing codebase.
				<br />
				<br />
				One of the best ways to improve your skills is to gain the habit of
				reading through other peoples code while writing code that others can
				learn new coding techniques and styles from.
			</Text>
		</>
	);
}

export default Introduction;
