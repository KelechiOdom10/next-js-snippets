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
import { signup } from "../services/api";
import { useForm } from "react-hook-form";

export default function SignupForm() {
	const { handleSubmit, errors, register, formState } = useForm();
	const toast = useToast();
	const { colorMode } = useColorMode();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Box my={7} mx={4} textAlign="left">
			<form onSubmit={handleSubmit(values => signup(values, toast))} noValidate>
				<FormControl isInvalid={errors.username} isRequired>
					<FormLabel
						htmlFor="username"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
					>
						Username
					</FormLabel>
					<Input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
						ref={register({
							required: "Username is required",
							validate: value => {
								return (
									[/[`~,.<>;':"\/\[\]\|{}()=+-]/].every(
										pattern => !pattern.test(value)
									) || "Username shouldn't contain special characters"
								);
							},
						})}
					/>
					<FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
						{errors?.username && errors.username.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl mt={4} isInvalid={errors.email} isRequired>
					<FormLabel
						htmlFor="email"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
					>
						Email address
					</FormLabel>
					<Input
						type="email"
						id="email"
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
						htmlFor="password"
						fontSize={{ base: "sm", md: "sm", lg: "md" }}
					>
						Password
					</FormLabel>
					<InputGroup size="md">
						<Input
							id="password"
							name="password"
							pr="4.5rem"
							type={show ? "text" : "password"}
							placeholder="Enter password"
							fontSize={{ base: "sm", md: "sm", lg: "md" }}
							ref={register({
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
								validate: value => {
									return (
										[/[A-Z]/, /[0-9]/].every(pattern => pattern.test(value)) ||
										"Must include uppercase letters and numbers"
									);
								},
							})}
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
						Already have an account?{" "}
						<Link color="teal.500" fontWeight="bold" href="/login">
							Login
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
					Sign up
				</Button>
			</form>
		</Box>
	);
}
