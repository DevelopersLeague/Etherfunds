import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightAddon,
    InputGroup,
    Alert,
    AlertIcon,
    AlertDescription,
    FormHelperText,
    Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMetamask } from "use-metamask";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
// import useCreateWithdrawRequestMutation from '../hooks/mutations/useCreateWithdrawRequestMutation'
import useWithdrawFundsMutation from '../hooks/mutations/useWithdrawFundsMutation'
const RequestWithdrawal = () => {
    const params = useParams();
    const id = params.id;
    
    const { mutate, isLoading, data } = useWithdrawFundsMutation();
    // console.log(data)
    let navigate = useNavigate();
    const { connect, metaState } = useMetamask();
    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({
        mode: "onChange"
    })
    const [error, setError] = useState("");
    // const [isLoading, setIsLoading] = useState(0)
    async function onSubmit(data) {
        // campaignId, amount, beneficiary, description
        const {amount, beneficiary, description} = data;
        mutate({ campaignId: id, amount, beneficiary}, {
            onSuccess: () => {
                navigate(`/fundraiser/${id}/`);
            }
        })
    }

    return (
        <>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
                    <Text fontSize={"lg"} color={"teal.400"}>
                        <ArrowBackIcon mr={2} />
                        <Link to={`/fundraiser/${id}`}>Back to fund details</Link>
                    </Text>

                    <Stack>
                        <Heading fontSize={"4xl"}>Withdrawal Request for fund</Heading>
                    </Stack>

                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>

                                {/* <FormControl id="description">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        {...register("description", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl> */}

                                <FormControl id="amount">
                                    <FormLabel>Amount in ETH to be withdrawn</FormLabel>
                                    <Input
                                        {...register("amount", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                                <FormControl id="beneficiary">
                                    <FormLabel>Benificiary address</FormLabel>
                                    <Input
                                        {...register("beneficiary", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                            
                                
                                {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}> {error}</AlertDescription>
                                    </Alert>
                                ) : null}

                                {errors.minimumContribution || errors.name || errors.description || errors.imageUrl || errors.target ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}

                                <Stack spacing={10}>

                                    <Stack spacing={3}>
                                        {/* conditional rendering if wallet is  connected will come here */}
                                        {metaState.isConnected ?

                                            (<Button
                                                color={"white"}
                                                bg={"teal.400"}
                                                _hover={{
                                                    bg: "teal.300",
                                                }}
                                                type={'submit'}
                                                isLoading={isLoading}
                                            >
                                                Submit {" "}
                                            </Button>) :

                                            <Alert status="warning">
                                                <AlertIcon />
                                                <AlertDescription mr={2}>
                                                    Please Connect Your Wallet First to Create a Fund
                                                </AlertDescription>
                                            </Alert>
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </>
    )
}

export default RequestWithdrawal