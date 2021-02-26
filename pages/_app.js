import "../styles/globals.css";
import React from "react";
import {
	ChakraProvider,
	extendTheme,
	theme as chakraTheme,
} from "@chakra-ui/react";
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

const theme = extendTheme({
	...chakraTheme,
	fonts: {
		...chakraTheme.fonts,
		heading: `Nunito,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, sans-serif`,
		body: `Roboto Mono, Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, monospace, sans-serif`,
	},
	colors: {
		...chakraTheme.colors,
		teal: {
			50: "#CCF5EF",
			400: "#32a09a",
		},
	},
});

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
