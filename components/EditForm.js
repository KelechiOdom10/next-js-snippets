import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { urls } from "../services/api";

const CodeWithCodemirror = dynamic(import("./CodeEditor"), {
	ssr: false,
});

function EditForm({ snippet }) {
	const queryClient = useQueryClient();
	const token = queryClient.getQueryData("token");
	const router = useRouter();

	const [name, setName] = useState(snippet ? snippet.name : "");
	const [description, setDescription] = useState(
		snippet ? snippet.description : ""
	);
	const [code, setCode] = useState(snippet ? snippet.code : "");
	const [language, setLanguage] = useState(snippet ? snippet.language : "");
	const toast = useToast();

	const updateSnippet = async () => {
		const response = await fetch(
			`${urls[process.env.NODE_ENV]}/api/snippets/${snippet.id}`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({ name, language, code, description }),
			}
		);

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
		}

		if (data.status === "success") {
			toast({
				title: "Snippet created.",
				position: "top-right",
				description: "You have successfully created a snippet!",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		}

		return data.data;
	};

	const { mutateAsync, isLoading } = useMutation(updateSnippet, {
		onSuccess: async newSnippet => {
			if (queryClient.getQueryData("snippets")) {
				await queryClient.setQueryData("snippets", old => {
					return old.map(d => {
						if (d.id === snippet.id) {
							return newSnippet;
						}
						return d;
					});
				});
			} else {
				await queryClient.setQueryData("snippets", prev => [
					...prev,
					newSnippet,
				]);
				await queryClient.refetchQueries("snippets");
			}

			await queryClient.setQueryData(
				["snippet", snippet.id],
				() => newSnippet,
				{
					exact: true,
				}
			);
			router.push("/home");
		},

		onMutate: async newSnippet => {
			await queryClient.cancelQueries(["snippet", snippet.id], { exact: true });
			const previousSnippet = await queryClient.getQueryData(
				["snippet", snippet.id],
				{ exact: true }
			);
			queryClient.setQueryData(["snippet", snippet.id], () => newSnippet);

			return () =>
				queryClient.setQueryData(["snippet", snippet.id], previousSnippet);
		},
	});

	return (
		<Box mx="auto" my={3} width="75%">
			<form
				onSubmit={async e => {
					e.preventDefault();
					await mutateAsync();
				}}
			>
				<FormControl isRequired>
					<FormLabel fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						Name:
					</FormLabel>
					<Input
						type="text"
						placeholder="Enter your snippet title"
						value={name}
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
						onChange={e => setName(e.target.value)}
					/>
				</FormControl>
				<FormControl mt={4} isRequired>
					<FormLabel fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						Description:
					</FormLabel>
					<Input
						type="text"
						placeholder="Enter your snippet description"
						value={description}
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
						onChange={e => setDescription(e.target.value)}
					/>
				</FormControl>
				<Select
					isRequired
					variant="filled"
					my={6}
					placeholder="Select Language"
					fontSize={{ base: "sm", md: "sm", lg: "md" }}
					value={language}
					onChange={e => setLanguage(e.currentTarget.value)}
				>
					<option value="JavaScript">JavaScript</option>
					<option value="HTML">HTML</option>
					<option value="CSS">CSS</option>
					<option value="Python">Python</option>
					<option value="SQL">SQL</option>
					<option value="TypeScript">TypeScript</option>
					<option value="XML">XML</option>
					<option value="JSX">JSX</option>
					<option value="PHP">PHP</option>
				</Select>
				<CodeWithCodemirror
					code={code}
					setCode={setCode}
					language={language}
					theme="material-palenight"
				/>
				<Button
					fontWeight="bold"
					colorScheme="teal"
					my={4}
					type="submit"
					fontSize={{ base: "sm", md: "md" }}
					isLoading={isLoading}
					loadingText="updating"
				>
					Update Snippet
				</Button>
			</form>
		</Box>
	);
}

export default EditForm;
