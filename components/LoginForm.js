import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	IconButton,
	InputRightElement,
	Text,
	Button,
	Link,
	useColorMode,
	useToast,
	FormErrorMessage,
} from "@chakra-ui/react";
import { login } from "../services/api";
import { useForm } from "react-hook-form";

export default function LoginForm() {
	const { colorMode } = useColorMode();
	const { handleSubmit, errors, register, formState } = useForm();
	const toast = useToast();
	const [show, setShow] = useState(false);

	const handleClick = () => setShow(!show);

	return (
		<Box my={8} mx={4} textAlign="left">
			<form onSubmit={handleSubmit(values => login(values, toast))} noValidate>
				<FormControl isInvalid={errors.email} isRequired>
					<FormLabel
						htmlFor="login_email"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
					>
						Email address
					</FormLabel>
					<Input
						type="email"
						id="login_email"
						placeholder="Enter your email address"
						name="email"
						placeholder="Enter your email address"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
						ref={register({
							required: "Email is required",
							pattern: {
								value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								message: "Invalid email address",
							},
						})}
					/>
					<FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						{errors?.email && errors.email.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl mt={4} isInvalid={errors.password} isRequired>
					<FormLabel
						htmlFor="login_password"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
					>
						Password
					</FormLabel>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							id="login_password"
							type={show ? "text" : "password"}
							placeholder="Enter password"
							fontSize={{ base: "sm", md: "sm", lg: "md" }}
							name="password"
							ref={register({ required: "Password is required" })}
						/>
						<InputRightElement width="3rem">
							<IconButton
								h="1.75rem"
								size="sm"
								onClick={handleClick}
								colorScheme={colorMode === "dark" ? "teal" : "gray"}
								icon={show ? <ViewOffIcon /> : <ViewIcon />}
							/>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						{errors?.password && errors.password.message}
					</FormErrorMessage>
				</FormControl>

				<Box>
					<Text fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						Don't have an account?{" "}
						<Link color="teal.500" fontWeight="bold" href="/signup">
							Sign up
						</Link>
					</Text>
				</Box>

				<Button
					fontWeight="bold"
					colorScheme="teal"
					width={{ base: "full", md: formState.isSubmitting ? "40%" : "30%" }}
					mt={4}
					size={{ base: "sm", md: "md" }}
					px={4}
					py={2}
					fontSize={{ base: "sm", md: "md" }}
					type="submit"
					isLoading={formState.isSubmitting}
					loadingText="Submitting"
					disabled={errors.email || errors.password || errors.username}
				>
					Sign In
				</Button>
			</form>
		</Box>
	);
}
