import "../styles/globals.css";
import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import "focus-visible/dist/focus-visible";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

const GlobalStyles = css`
	.js-focus-visible :focus:not([data-focus-visible-added]) {
		outline: none;
		box-shadow: none;
	}
`;

function MyApp({ Component, pageProps }) {
	const queryClientRef = React.useRef();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClientRef.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<Global styles={GlobalStyles} />
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default MyApp;
