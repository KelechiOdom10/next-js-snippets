import "../styles/globals.css";
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { UserContextProvider } from "../context/userState";

const theme = extendTheme({
	components: {
		Button: {
			baseStyle: { _focus: { boxShadow: "none", outline: "0 !important" } },
		},
		Tabs: {
			baseStyle: { _focus: { boxShadow: "none", outline: "0 !important" } },
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
					<UserContextProvider>
						<Component {...pageProps} />
					</UserContextProvider>
				</Hydrate>
			</QueryClientProvider>
		</ChakraProvider>
	);
}

export default MyApp;
