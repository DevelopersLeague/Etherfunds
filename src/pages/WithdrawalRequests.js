import React from 'react'
import { Divider, Container, Heading, useBreakpointValue, useColorModeValue, Text, SimpleGrid, Center} from "@chakra-ui/react";
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