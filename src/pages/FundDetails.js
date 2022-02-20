import React, { useState } from 'react'
import {
	Box,
	Flex,
	Stack,
	Heading,
	Text,
	Container,
	Input,
	Button,
	SimpleGrid,
	InputRightAddon,
	InputGroup,
	FormControl,
	FormLabel,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
	Tooltip,
	Alert,
	AlertIcon,
	AlertDescription,
	Progress,
	CloseButton,
	FormHelperText,
	Link,
} from "@chakra-ui/react";
import FundDetailsCard from '../components/FundDetailsCard'
import { InfoIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import funds from '../data';
const FundDetails = () => {
	// contains key value object 
	const params = useParams();
	const obj = funds.filter((fund) => {
		// console.log(fund.id, params.id);
		if (fund.id == params.id)
			return fund;
	})
	console.log("Obj:", obj[0]);
	const { id, minimumContribution, balance, name, description, image, target } = obj[0];
	const { handleSubmit, register, formState, reset, getValues } = useForm({
		mode: "onChange",
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");
	const [amountInRS, setAmountInRS] = useState();

	async function onSubmit(data) {
		console.log(data);

		// submit donation logic goess here
		// setAmountInRS(null)
		// reset("", {
		// keepValues: false,
		// });
		// setIsSubmitted(true);
		// setError(false);
	}
	return (
		<main>
			<Box position={"relative"}>
				<Container
					as={SimpleGrid}
					maxW={"7xl"}
					columns={{ base: 1, md: 2 }}
					spacing={{ base: 10, lg: 32 }}
					py={{ base: 6 }}
					my={20}
				>
					<Stack spacing={{ base: 6 }}>
						<Heading
							lineHeight={1.1}
							fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}>
							{name}
						</Heading>
						<Text
							color={useColorModeValue("gray.500", "gray.200")}
							fontSize={{ base: "lg" }}>
							{description}
						</Text>
						<Link
							color="teal.500"
							href={`https://rinkeby.etherscan.io/address/${id}`}
							isExternal>
							View on Rinkeby Etherscan <ExternalLinkIcon mx="2px" />
						</Link>

						<Box mx={"auto"} w={"full"}>
							<SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
								{/* please remove hard coding here */}
								<FundDetailsCard
									title={"Wallet Address of Fund Creator"}
									stat="0xggdgdhddhdn"
									info={
										"The Fund Creator created the Fund and can create requests to withdraw money."
									}
								/>
								<FundDetailsCard
									title={"Number of Requests"}
									stat="5"
									info={
										"A request tries to withdraw money from the contract. Requests must be approved by contributors"
									}
								/>
								<FundDetailsCard
									title={"Number of Contributors"}
									stat="19"
									info={
										"Number of people who have already donated to this Fund"
									}
								/>
							</SimpleGrid>
						</Box>
					</Stack>

					<Stack spacing={{ base: 4 }}>
						<Box>
							<Stat
								bg={useColorModeValue("white", "gray.700")}
								boxShadow={"lg"}
								rounded={"xl"}
								p={{ base: 4, sm: 6, md: 8 }}
								spacing={{ base: 8 }}
							>
								<StatLabel fontWeight={"medium"}>
									<Text as="span" isTruncated mr={2}>
										{" "}
										Fund Balance
									</Text>
									<Tooltip
										label="The balance is how much money this Fundraiser has left to spend."
										bg={useColorModeValue("white", "gray.700")}
										placement={"top"}
										color={useColorModeValue("gray.800", "white")}
										fontSize={"1em"}
										px="4"
									>
										<InfoIcon
											color={useColorModeValue("teal.800", "white")}
										/>
									</Tooltip>
								</StatLabel>
								<StatNumber>
									<Box
										fontSize={"2xl"}
										isTruncated
										maxW={{ base: "	15rem", sm: "sm" }}
										pt="2"
									>
										<Text
											as="span"
											display={Number(balance) > 0 ? "inline" : "none"}
											pr={2}
											fontWeight={"bold"}
										>
											{balance}
											ETH
										</Text>
										<Text
											as="span"
											fontSize="lg"
											display={balance > 0 ? "inline" : "none"}
											fontWeight={"normal"}
											color={useColorModeValue("gray.500", "gray.200")}
										>
											{/* (${getWEIPriceInRS(ETHPrice, balance)}) */}
											(XXX Rs)
										</Text>
									</Box>

									<Text fontSize={"md"} fontWeight="normal">
										target of {target} ETH (Rs
										{"XXX"})
									</Text>
									<Progress
										colorScheme="teal"
										size="sm"
										value={balance}
										max={target}
										mt={4}
									/>
								</StatNumber>
							</Stat>
						</Box>

						<Stack
							bg={useColorModeValue("white", "gray.700")}
							boxShadow={"lg"}
							rounded={"xl"}
							p={{ base: 4, sm: 6, md: 8 }}
							spacing={{ base: 6 }}
						>
							<Heading
								lineHeight={1.1}
								fontSize={{ base: "2xl", sm: "3xl" }}
								color={useColorModeValue("teal.600", "teal.200")}
							>
								Contribute Now!
							</Heading>

							<Box mt={10}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<FormControl id='value'>
										<FormLabel>
											Amount in Ether you want to contribute
										</FormLabel>
										<InputGroup>
											{" "}
											<Input
												{...register("value", { required: true })}
												type="number"
												isDisabled={formState.isSubmitting}
												onChange={(e) => {
													// setAmountInRS(Math.abs(e.target.value));
													console.log(e)
												}}
												step="any"
												min="0"
											/>{" "}
											<InputRightAddon children="ETH" />
										</InputGroup>

										{/* Display amt in Rs */}
										{/* {amountInRS ? (
											<FormHelperText>
												~$ {getETHPriceInRS(ETHPrice, amountInRS)}
											</FormHelperText>
										) : null} */}
									</FormControl>

									{error ? (
										<Alert status="error" mt="2">
											<AlertIcon />
											<AlertDescription mr={2}> {error}</AlertDescription>
										</Alert>
									) : null}

									<Stack spacing={10}>
										{/* Add conditional rendering for when wallet is connected */}
										<Button
											fontFamily={"heading"}
											mt={4}
											w={"full"}
											bgGradient="linear(to-r, teal.400,green.400)"
											color={"white"}
											_hover={{
												bgGradient: "linear(to-r, teal.400,blue.400)",
												boxShadow: "xl",
											}}
											isLoading={formState.isSubmitting}
											isDisabled={amountInRS ? false : true}
											type="submit"
										>
											Contribute
										</Button>
										<Alert status="warning" mt={4}>
											<AlertIcon />
											<AlertDescription mr={2}>
												Please Connect Your Wallet to Contribute
											</AlertDescription>
										</Alert>
									</Stack>
								</form>
							</Box>
						</Stack>

						<Stack
							bg={useColorModeValue("white", "gray.700")}
							boxShadow={"lg"}
							rounded={"xl"}
							p={{ base: 4, sm: 6, md: 8 }}
							spacing={4}
						>
							<a href='' target={"_blank"}>
								<Button
									fontFamily={"heading"}
									w={"full"}
									bgGradient="linear(to-r, teal.400,green.400)"
									color={"white"}
									_hover={{
										bgGradient: "linear(to-r, teal.400,blue.400)",
										boxShadow: "xl",
									}}
								>
									View Withdrawal Requests
								</Button>
							</a>
							<Text fontSize={"sm"}>
								* You can see where these funds are being used & if you have
								contributed you can also approve those Withdrawal Requests :)
							</Text>
						</Stack>
					</Stack>
				</Container>
			</Box>
		</main>
	)
}

export default FundDetails