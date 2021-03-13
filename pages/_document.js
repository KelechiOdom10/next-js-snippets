import { ColorModeScript } from "@chakra-ui/color-mode";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends NextDocument {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;800&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
