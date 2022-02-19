import React from 'react';
import FeatureBox from '../components/FeatureBox';
import {
    Heading,
    useBreakpointValue,
    useColorModeValue,
    Text,
    Button,
    Flex,
    Container,
    SimpleGrid,
    Box,
    Divider,
    Skeleton,
    Img,
    Icon,
    chakra,
    Tooltip,
    SkeletonCircle,
    HStack,
    Stack,
    Progress,
} from "@chakra-ui/react";
import FundraiserCard from '../components/FundraiserCard';
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";
import { Link } from 'react-router-dom';

import styles from '../styles/Home.module.css'

const LandingPage = () => {
    return <div>
        <main className={styles.main}>
            <Container py={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
                {" "}
                <Heading
                    textAlign={useBreakpointValue({ base: "left" })}
                    fontFamily={"heading"}
                    color={useColorModeValue("gray.800", "white")}
                    as="h1"
                    py={4}
                >
                    Crowdfunding using the powers of <br /> Crypto & Blockchain 😄{" "}
                </Heading>

                {/* Navlink will come here */}
                <Link to="/fundraiser/new/">
                    <Button
                        display={{ sm: "inline-flex" }}
                        fontSize={"md"}
                        fontWeight={600}
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{
                            bg: "teal.300",
                        }}
                    >
                        Create Fundraiser
                    </Button>
                </Link>
            </Container>

            <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                <HStack spacing={2}>
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        Open Fundraisers
                    </Heading>
                </HStack>

                <Divider marginTop="4" />

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
                    <div>
                        <FundraiserCard
                            name="test fundname"
                            description="Just testing"
                            creatorId="Some SHA string"
                            imageURL="TBD"
                            id="umm nope"
                            target="10,000"
                            balance="10"
                            ethPrice="10 ETH"
                        />
                    </div>
                    <div>
                        <FundraiserCard
                            name="test fundname"
                            description="Just testing"
                            creatorId="Some SHA string"
                            imageURL="TBD"
                            id="umm nope"
                            target="10,000"
                            balance="0"
                            ethPrice="10 ETH"
                        />
                    </div>
                </SimpleGrid>
            </Container>

            <Container py={{ base: "4", md: "12" }} maxW={"7xl"} id="howitworks">
                <HStack spacing={2}>
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        How Etherfunds Works
                    </Heading>
                </HStack>
                <Divider marginTop="4" />
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
                    <FeatureBox
                        icon={<Icon as={FcDonate} w={10} h={10} />}
                        title={"Create a Fundraiser for Fundraising"}
                        text={
                            "It’ll take only 2 minutes. Just enter a few details about the funds you are raising for."
                        }
                    />
                    <FeatureBox
                        icon={<Icon as={FcShare} w={10} h={10} />}
                        title={"Share your Fundraiser"}
                        text={
                            "All you need to do is share the Fundraiser with your friends, family and others. In no time, support will start pouring in."
                        }
                    />
                    <FeatureBox
                        icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
                        title={"Request and Withdraw Funds"}
                        text={
                            "The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request."
                        }
                    />
                </SimpleGrid>

            </Container>
        </main>
    </div>;
};

export default LandingPage;
