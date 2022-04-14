import React from 'react'
import {
    Stack, useColorModeValue, Heading, Box, Text, SimpleGrid, Stat, Tooltip, StatLabel, StatNumber, Flex, Progress
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import FundDetailsCard from './FundDetailsCard';

const WithdrawalRequestCard = (props) => {
    const withdrawalID = 1;
    const {id, description, amount, numberOfContributors} = props;
    return <Link to={`/Fundraiser/${id}/withdrawalrequests/${withdrawalID}`}>
        <Stack
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 6 }}
            transition={"transform 0.3s ease"}
            _hover={{
                transform: "translateY(-10px) scale(1.03)",        
            }}
        >
            <Heading
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl" }}
                color={useColorModeValue("teal.600", "teal.200")}
            >
                Request ID: 1
            </Heading>

            <Box mt={10}>
                <Text fontSize={"md"} fontWeight="normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie nibh eget felis sagittis.
                </Text>
            </Box>

            <Box mt={10} w={"full"}>
                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 5 }}>
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
                            <Flex justifyContent={"start"}>
                                <Box isTruncated>
                                    <StatLabel fontWeight={"medium"} isTruncated>
                                        {"Recipient Address"}
                                    </StatLabel>
                                    <StatNumber
                                        fontSize={"sm"}
                                        fontWeight={"bold"}
                                        isTruncated
                                    >
                                        {"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"}
                                    </StatNumber>
                                </Box>
                            </Flex>
                        </Tooltip>
                    </Stat>                                                    
                </SimpleGrid>        
            </Box>
            <Box >
                <Text 
                    align={"start"}
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    color={useColorModeValue("teal.600", "teal.200")}
                >
                    20 Contributers Approved
                </Text>
                <Text                     
                    align={"start"}                    
                >
                    Out Of total 100 contributers
                </Text>
                <Progress
                    align={"start"}
                    hasStripe
                    colorScheme="teal"
                    size="sm"
                    value={"20"}
                    max={"100"}
                    mt={2}
                />  
            </Box>

        </Stack>
    </Link>
};

export default WithdrawalRequestCard