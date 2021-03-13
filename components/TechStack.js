import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import Stack from "./Stack";

function TechStack() {
	return (
		<>
			<Heading fontSize={{ base: "1.6rem", md: "3xl" }} mt={10}>
				Technology Stack
			</Heading>
			<Text
				my={3}
				fontFamily="Nunito"
				fontWeight="semibold"
				fontSize={["sm", "sm", "md"]}
			>
				This project was partly created to learn how to combine technologies to
				deliver a full scale solution. These are just some of the technology
				services used to build and run this web application.
			</Text>
			<hr />
			<Box mt={5} mb={20}>
				<Stack
					header="Next.js"
					text="Fullstack Framework"
					href="https://nextjs.org/"
					src="/next-js.svg"
					altText="Next.js Logo"
				/>
				<Stack
					header="React Query"
					text="Fetch, cache and updae data"
					href="https://react-query.tanstack.com/"
					src="/react-query.svg"
					altText="React Query Logo"
				/>
				<Stack
					header="Chakra UI"
					text="Modular component library"
					href="https://chakra-ui.com/"
					src="/chakra-ui.png"
					altText="Chakra UI Logo"
				/>
				<Stack
					header="React Hook Form"
					text="React Hooks for forms validation"
					href="https://react-hook-form.com/"
					src="/react-hook-form.png"
					altText="React Hook Form Logo"
				/>
				<Stack
					header="Heroku Postgres"
					text="Managed PostgreSQL from Heroku"
					href="https://www.heroku.com/postgres"
					src="/heroku-postgres.png"
					altText="Heroku Postgres Logo"
				/>
				<Stack
					header="Vercel"
					text="Static and Jamstack deployment"
					href="https://vercel.com/"
					src="/vercel.png"
					altText="Vercel Logo"
				/>
			</Box>
		</>
	);
}

export default TechStack;
