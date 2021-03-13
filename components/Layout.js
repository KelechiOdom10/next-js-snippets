import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
const Layout = ({ children, title, description, ...props }) => (
	<Box {...props} position="relative">
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/coding-logo.ico" type="image/x-icon" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
			/>
			<meta name="description" content={description} />
		</Head>
		{children}
	</Box>
);

export default Layout;
