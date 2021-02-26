import {
	TriangleUpIcon,
	TriangleDownIcon,
	EditIcon,
	DeleteIcon,
} from "@chakra-ui/icons";
import {
	Flex,
	Heading,
	Button,
	Text,
	useDisclosure,
	Collapse,
	Stack,
	IconButton,
	Tag,
	useColorModeValue,
	useToast,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogBody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Code from "./Code";
import { urls } from "../services/api";

const colorMatch = language => {
	switch (language) {
		case "JavaScript":
		case "JSX":
		case "SQL":
			return "yellow";
		case "CSS":
		case "Python":
			return "blue";
		case "HTML":
		case "XML":
		case "PHP":
			return "red";
		default:
			return "green";
	}
};

export default function Snippet({ snippet, disabled, setLanguage }) {
	const queryClient = useQueryClient();
	const token = queryClient.getQueryData("token");
	const user = queryClient.getQueryData("user");
	const router = useRouter();
	const [isAlertOpen, setIsOpen] = React.useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = React.useRef();
	const { isOpen, onToggle } = useDisclosure();
	const toast = useToast();

	const deleteSnippetById = async () => {
		const response = await fetch(
			`${urls[process.env.NODE_ENV]}/api/snippets/${snippet.id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
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
			onClose();
		}

		if (data.status === "success") {
			toast({
				title: data.message,
				position: "top-right",
				description: "We've deleted your snippet",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
			onClose();
		}

		return true;
	};

	const { mutateAsync, isLoading } = useMutation(deleteSnippetById, {
		onMutate: () => {
			const previousSnippets = queryClient.getQueryData("snippets");
			const updatedSnippets = [...previousSnippets];
			const removeDeleted = updatedSnippets.filter(
				item => item.id !== snippet.id
			);

			queryClient.setQueryData("snippets", removeDeleted);

			return () => queryClient.setQueryData("snippets", previousSnippets);
		},
		onSuccess: () => {
			queryClient.removeQueries(["snippet", snippet.id], { exact: true });
			queryClient.setQueryData("snippets", prev => [...prev]);
		},
	});

	const deleteSnippet = async e => {
		e.preventDefault();
		await mutateAsync();
	};

	const canEdit = parseInt(user?.id) === snippet.user_id;

	return (
		<Flex
			flexDirection="column"
			_hover={{ transform: "scale(1.03)" }}
			mx="auto"
			rounded="sm"
			boxShadow="lg"
			mt={7}
			p={2}
			borderWidth={useColorModeValue(1, 0)}
			transition="transform .4s ease-in-out"
			bg={useColorModeValue("white", "gray.700")}
		>
			<Flex
				justify="space-between"
				py={{ base: 2, md: 4 }}
				px={4}
				align="center"
				wrap="wrap"
			>
				<Heading as="h2" fontSize={["md", "md", "lg", "xl"]}>
					{snippet.name}
				</Heading>
				<Tag
					fontWeight="bold"
					fontSize={["xs", "sm", "md", "lg"]}
					variant="subtle"
					py={2}
					px={2}
					cursor="pointer"
					onClick={() => setLanguage(snippet.language)}
					colorScheme={colorMatch(snippet.language)}
				>
					{snippet.language}
				</Tag>
			</Flex>
			<Text px={4} fontWeight="medium" fontSize={["xs", "sm", "md", "md"]}>
				{snippet.description}
			</Text>
			<Button
				rightIcon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
				my={4}
				mx={4}
				rounded="md"
				w={["44%", "27%", "23%"]}
				onClick={onToggle}
				fontSize={{ base: "sm", md: "sm", lg: "md", xl: "lg" }}
				fontWeight="bold"
				colorScheme="teal"
			>
				Show {isOpen ? "Less" : "More"}
			</Button>
			<Collapse in={isOpen} animateOpacity>
				<Code code={snippet.code} language={snippet.language} />
			</Collapse>
			{disabled ? null : (
				<Stack direction="row" spacing={2} mx={3}>
					<IconButton
						icon={<EditIcon />}
						variant="ghost"
						fontSize={{ base: "sm", lg: "md", xl: "lg" }}
						isDisabled={!canEdit}
						onClick={() => {
							router.push(`/edit/${snippet.id}`);
						}}
						colorScheme="blue"
					/>
					<IconButton
						icon={<DeleteIcon />}
						variant="ghost"
						fontSize={{ base: "sm", lg: "md", xl: "lg" }}
						isDisabled={!canEdit}
						onClick={() => setIsOpen(true)}
						isLoading={isLoading}
						colorScheme="red"
					/>
				</Stack>
			)}

			<AlertDialog
				isOpen={isAlertOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				motionPreset="scale"
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize={{ base: "xs", md: "sm" }}
							fontWeight="bold"
						>
							Delete Snippet
						</AlertDialogHeader>

						<AlertDialogBody
							fontSize={{ base: "xs", md: "sm", lg: "md", xl: "lg" }}
						>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
								fontSize={{ base: "sm", lg: "md", xl: "lg" }}
							>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={deleteSnippet}
								ml={3}
								fontSize={{ base: "sm", lg: "md", xl: "lg" }}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Flex>
	);
}
