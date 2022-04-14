import React from 'react'
import { Button, Progress, Stat, Tooltip, Flex, StatLabel, StatNumber, Box, Divider, Container, Heading, useBreakpointValue, useColorModeValue, Text, SimpleGrid, Center, Stack} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import styles from '../styles/Home.module.css'
import WithdrawalRequestCard from '../components/WithdrawalRequestCard';

const WithdrawalRequestApprove = () => {
  return <div>
        <main className={styles.main}>
        <Container py={{ base: "4", md: "0" }} maxW={"7xl"} align={"left"}>
            <Heading
                textAlign={useBreakpointValue({ base: "center" })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
                as="h2"                
            >
                Withdrawal Request - <Text as={"span"} color={useColorModeValue("teal.400", "teal.200")} Inline>1</Text> For <br /> <Text as={"span"} color={useColorModeValue("teal.400", "teal.200")} Inline>Covid Reliefs</Text> Campaign <EditIcon />
            </Heading>

            <Divider marginTop="4" />
            <Box
                marginTop="4"
                padding={4}                
                border={"1px solid"}
                borderColor={"black.800"}
                shadow={"lg"}
                rounded={"xl"}
                align={"center"}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie nibh eget felis sagittis, sit amet molestie ipsum congue. Maecenas eget nisl nisl. Nulla faucibus sit amet eros a hendrerit. Vivamus hendrerit mollis ex, nec dictum sem luctus in.
            </Box>
            <Box
                marginTop="4"
                padding={4}                                                
                shadow={"lg"}
                rounded={"xl"}
                align={"center"}
                as={SimpleGrid}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
            >
                <Stack spacing={{ base: 6 }}>
                    <Stat
                        px={{ base: 2, md: 4 }}
                        py={"5"}
                        shadow={"lg"}
                        border={"1px solid"}
                        borderColor={"gray.500"}
                        rounded={"lg"}
                        transition={"transform 0.3s ease"}
                        _hover={{
                            transform: "translateY(-5px)",
                        }}
                    >
                        <Tooltip
                            label={"Amount To be Withdrawen by the fundraiser"}
                            bg={useColorModeValue("black", "teal.500")}
                            placement={"top"}
                            rounded={"lg"}
                            color={useColorModeValue("white", "white")}
                            fontSize={"1em"}
                        >
                            <Flex justifyContent={"center"}>
                                <Box>
                                    <StatLabel fontWeight={"medium"} isTruncated>
                                        {"Withdrawal Amount"}
                                    </StatLabel>
                                    <StatNumber
                                        fontSize={"base"}
                                        fontWeight={"bold"}
                                        isTruncated                            
                                    >
                                        {"100"}
                                    </StatNumber>
                                </Box>
                            </Flex>
                        </Tooltip>
                    </Stat>  
                    <Stat
                        px={{ base: 2, md: 4 }}
                        py={"5"}
                        shadow={"lg"}
                        border={"1px solid"}
                        borderColor={"gray.500"}
                        rounded={"lg"}
                        transition={"transform 0.3s ease"}
                        _hover={{
                            transform: "translateY(-5px)",
                        }}
                    >
                        <Tooltip
                            label={"Wallet Address of the recipient to which the amoount is being transferred"}                            
                            bg={useColorModeValue("black", "teal.500")}
                            placement={"top"}
                            rounded={"lg"}
                            color={useColorModeValue("white", "white")}
                            fontSize={"1em"}
                        >
                            <Flex justifyContent={"center"}>
                                <Box isTruncated>
                                    <StatLabel fontWeight={"medium"} isTruncated>
                                        {"Recipient Address"}
                                    </StatLabel>
                                    <StatNumber
                                        fontSize={"base"}
                                        fontWeight={"bold"}
                                        isTruncated
                                    >
                                        {"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"}
                                    </StatNumber>
                                </Box>
                            </Flex>
                        </Tooltip>
                    </Stat> 
                </Stack>

                <Stack spacing={{ base: 4 }}>
                    <Box>
                        <Stat
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow={"lg"}
                            rounded={"xl"}
                            p={{ base: 2, sm: 4, md: 6 }}
                            spacing={{ base: 8 }}
                        >
                            <StatLabel fontWeight={"medium"}>
                                <Text as="span" isTruncated mr={2}>
                                    {" "}
                                    Approval Status
                                </Text>
                                <Tooltip
                                    label="How many contributors have approved out of 50% of total contributors"
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
                                        // display={Number(balance.toString()) > 0 ? "inline" : "none"}
                                        pr={2}
                                        fontWeight={"bold"}
                                    >
                                        {10} {" "}
                                        Contributors
                                    </Text>                                    
                                </Box>

                                <Text fontSize={"md"} fontWeight="normal">
                                    out of total {100} Contributors                                    
                                </Text>
                                <Progress
                                    align={"start"}
                                    colorScheme="teal"
                                    size="sm"
                                    value={10}
                                    max={100}
                                    mt={4}
                                />
                            </StatNumber>
                        </Stat>
                    </Box>
                    <Box>
                    <Button                        
                        fontFamily={"heading"}
                        mt={4}
                        w={"40%"}
                        bgGradient="linear(to-r, green.400,teal.400)"
                        color={"white"}
                        marginRight={4}
                        _hover={{
                            bgGradient: "linear(to-r, green.400,blue.400)",
                            boxShadow: "xl",
                        }}
                        // isLoading={isMutationLoading}
                        // isDisabled={metaState.isConnected ? false : true}                        
                    >                        
                        Approve <CheckIcon marginStart={2} />
                    </Button>
                    <Button                        
                        fontFamily={"heading"}
                        mt={4}
                        w={"40%"}
                        bgGradient="linear(to-r, teal.400,red.400)"
                        color={"white"}
                        _hover={{
                            bgGradient: "linear(to-r, blue.400,red.400)",
                            boxShadow: "xl",
                        }}
                        // isLoading={isMutationLoading}
                        // isDisabled={metaState.isConnected ? false : true}                        
                    >                        
                        Reject <CloseIcon marginStart={2}/>
                    </Button>
                    </Box>
                </Stack>
                 
            </Box>           
        </Container>        
        </main>
    </div>;
  
};

export default WithdrawalRequestApprove