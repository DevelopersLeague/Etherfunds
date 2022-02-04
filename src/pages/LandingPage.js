import React from 'react';
import FeatureBox from '../components/FeatureBox';
import {
    SimpleGrid,
    Icon,
    
} from "@chakra-ui/react";
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";

const LandingPage = () => {
    return <div>
        <main>
            
        </main>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
            <FeatureBox
                icon={<Icon as={FcDonate} w={10} h={10} />}
                title={"Create a Campaign for Fundraising"}
                text={
                    "It’ll take only 2 minutes. Just enter a few details about the funds you are raising for."
                }
            />
            <FeatureBox
                icon={<Icon as={FcShare} w={10} h={10} />}
                title={"Share your Campaign"}
                text={
                    "All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in."
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
  </div>;
};

export default LandingPage;
