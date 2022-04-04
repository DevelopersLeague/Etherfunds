import React from 'react'
import FeatureBox from '../components/FeatureBox';
import {
    Heading,
    useBreakpointValue,
    useColorModeValue,
    Button,
    Container,
    SimpleGrid,
    Divider,
    Icon,
    SkeletonCircle,
    HStack,
} from "@chakra-ui/react";
import FundraiserCard from '../components/FundraiserCard';
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";
import { Link } from 'react-router-dom';
import funds from '../data';
import useGetAllCampaigns from '../hooks/queries/useGetAllCampaigns';
import styles from '../styles/Home.module.css'
const FundsCreatedByMe = () => {
  return (
    <div>
        <main className={styles.main}>
            
            <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                <HStack spacing={2}>
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        Fundraisers Created by you
                    </Heading>
                </HStack>

                <Divider marginTop="4" />

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
                    {funds.map((fund) => {
                        return (
                            <div key={fund.id}>
                                <FundraiserCard
                                    name={fund.name}
                                    description={fund.description}
                                    creatorId={fund.creatorId}
                                    imageURL={fund.imageURL}
                                    id={fund.id}
                                    target={fund.target}
                                    balance={fund.balance}
                                    ethPrice="NA"
                                />
                            </div>
                        );
                    })}

                    {/* <div>
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
                </div> */}
                </SimpleGrid>
            </Container>
        </main>
    </div>
  )
}

export default FundsCreatedByMe