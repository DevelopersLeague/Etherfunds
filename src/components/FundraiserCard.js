import React from 'react';
import {
    Heading,
    useColorModeValue,
    Text,
    Flex,
    Box,
    Img,
    Icon,
    chakra,
    Tooltip,
    Progress,
} from "@chakra-ui/react";

const FundraiserCard = ({ name, description, creatorId, imageURL, id, balance, target, ethPrice }) => {

    return (
        // pls add a Navlink component
        <a href={`/Fundraiser/${id}`}>
            <Box
                bg={useColorModeValue("white", "gray.800")}
                maxW={{ md: "sm" }}
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition={"transform 0.3s ease"}
                _hover={{
                    transform: "translateY(-8px)",
                }}
            >
                <Box height="18em">
                    <Img
                        src={imageURL}
                        alt={`Picture of ${name}`}
                        roundedTop="lg"
                        objectFit="cover"
                        w="full"
                        h="full"
                        display="block"
                    />
                </Box>
                <Box p="6">
                    <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                        py={2}
                    >
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {name}
                        </Box>

                        <Tooltip
                            label="Click to see description"
                            bg={useColorModeValue("white", "gray.700")}
                            placement={"top"}
                            color={useColorModeValue("gray.800", "white")}
                            fontSize={"1.2em"}
                        >
                            <chakra.a display={"flex"}>
                                <Icon
                                    as="🤝"
                                    h={7}
                                    w={7}
                                    alignSelf={"center"}
                                    color={"teal.400"}
                                />{" "}
                            </chakra.a>
                        </Tooltip>
                    </Flex>
                    <Flex alignContent="center" py={2}>
                        {" "}
                        <Text color={"gray.500"} pr={2}>
                            by
                        </Text>{" "}
                        <Heading size="base" isTruncated>
                            {creatorId}
                        </Heading>
                    </Flex>
                    <Flex direction="row" py={2}>
                        <Box w="full">
                            <Box
                                fontSize={"2xl"}
                                isTruncated
                                maxW={{ base: "	15rem", sm: "sm" }}
                                pt="2"
                            >
                                {/* <Text as="span" fontWeight={"bold"}>
                                    {balance > 0
                                        ? web3.utils.fromWei(balance, "ether")
                                        : "0, Become a Donor 😄"}
                                </Text> */}
                                <Text
                                    as="span"
                                    display={balance > 0 ? "inline" : "none"}
                                    pr={2}
                                    fontWeight={"bold"}
                                >
                                    {" "}
                                    ETH
                                </Text>
                                <Text
                                    as="span"
                                    fontSize="lg"
                                    display={balance > 0 ? "inline" : "none"}
                                    fontWeight={"normal"}
                                    color={useColorModeValue("gray.500", "gray.200")}
                                >
                                    {/* (${getWEIPriceInUSD(ethPrice, balance)}) */}
                                </Text>
                            </Box>

                            {/* <Text fontSize={"md"} fontWeight="normal">
                                target of {web3.utils.fromWei(target, "ether")}
                                ETH
                                (${getWEIPriceInUSD(ethPrice, target)})
                            </Text> */}
                            <Progress
                                colorScheme="teal"
                                size="sm"
                                // value={web3.utils.fromWei(balance, "ether")}
                                // max={web3.utils.fromWei(target, "ether")}
                                value="30"
                                max="100"
                                mt="2"
                            />
                        </Box>{" "}
                    </Flex>
                </Box>
            </Box>
        </a>
    );
};

export default FundraiserCard;
