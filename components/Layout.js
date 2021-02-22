import Head from "next/head";
import React from "react";

const Layout = ({ children, title, description }) => (
	<>
		<Head>
			<title>{title}</title>
			<link
				rel="icon"
				href="https://seeklogo.com/images/C/coding-logo-553EFA7061-seeklogo.com.png"
				type="image/png"
				sizes="16x18"
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
			/>
			<meta name="description" content={description} />
		</Head>
		{children}
	</>
);

export default Layout;
