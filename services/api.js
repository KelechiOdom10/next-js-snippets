import router from "next/router";

export const urls = {
	test: `http://localhost:3000`,
	development: "http://localhost:3000",
	production: process.env.VERCEL_URL,
};

export const signup = async (values, toast) => {
	const response = await fetch(`${urls[process.env.NODE_ENV]}/api/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const data = await response.json();

	if (data.status === "error") {
		toast({
			title: "An error occurred.",
			position: "top-right",
			description: data.message,
			status: "error",
			duration: 2000,
			isClosable: true,
		});
	} else if (data.token) {
		toast({
			title: "Account created.",
			position: "top-right",
			description: "We've created your account for you.",
			status: "success",
			duration: 2000,
			isClosable: true,
		});
		router.push("/login");
	}
};

export const login = async (values, toast) => {
	const response = await fetch(`${urls[process.env.NODE_ENV]}/api/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const data = await response.json();

	if (data.status === "error") {
		toast({
			title: "An error occurred.",
			position: "top-right",
			description: data.message,
			status: "error",
			duration: 2000,
			isClosable: true,
		});
	} else if (data.token) {
		router.push("/home");
	}
};

export const logout = async () => {
	await fetch(`${urls[process.env.NODE_ENV]}/api/logout`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
	}).then(() => router.push("/"));
};

export const fetchAllSnippets = async () => {
	const response = await fetch(`${urls[process.env.NODE_ENV]}/api/snippets`);
	if (!response.ok) {
		throw new Error("Something went wrong");
	}
	const data = await response.json();
	return data.data;
};

export const fetchSnippetById = async id => {
	const response = await fetch(
		`${urls[process.env.NODE_ENV]}/api/snippets/${id}`
	);
	if (!response.ok) {
		throw new Error("Something went wrong");
	}
	const data = await response.json();
	return data.data;
};
