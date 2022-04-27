import React from 'react'
import { Divider, Container, Heading, useBreakpointValue, useColorModeValue, Text, SimpleGrid, Center, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { BellIcon } from '@chakra-ui/icons';
import styles from '../styles/Home.module.css'
import WithdrawalRequestCard from '../components/WithdrawalRequestCard';

const WithdrawalRequests = () => {
    return <div>
        <main className={styles.main}>
            <Container py={{ base: "4", md: "0" }} maxW={"7xl"} align={"left"}>
                <Heading
                    textAlign={useBreakpointValue({ base: "center" })}
                    fontFamily={"heading"}
                    color={useColorModeValue("gray.800", "white")}
                    as="h2"
                >
                    Withdrawal Requests For <br /> <Text as={"span"} color={useColorModeValue("teal.400", "teal.200")} Inline>Covid Reliefs</Text> Campaign <BellIcon />
                </Heading>


                <Center>
                    <Button
                        fontFamily={"heading"}
                        mt={4}
                        w={"half"}
                        bgGradient="linear(to-r, teal.400,green.400)"
                        color={"white"}
                        _hover={{
                            bgGradient: "linear(to-r, teal.400,blue.400)",
                            boxShadow: "xl",
                        }}
                        type="submit"
                        // variant={"link"}
                    >
                        <Link to="/requestwithdrawal">
                            Create a withdrawal request
                        </Link>
                    </Button>
                </Center>

                <Divider marginTop="4" />
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8} align={"center"}>
                    <div>
                        <WithdrawalRequestCard
                            id={1}
                            description={"hello"}
                            amount={100}
                            numberOfContributors={20}
                        />
                    </div>
                    <div>
                        <WithdrawalRequestCard
                            id={1}
                            description={"hello"}
                            amount={100}
                            numberOfContributors={20}
                        />
                    </div>

                </SimpleGrid>
            </Container>
        </main>
    </div>;

};

export default WithdrawalRequests