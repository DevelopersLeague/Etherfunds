import React from 'react';
import {
    Flex,
    Text,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";

const FeatureBox = ({ title, text, icon }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={"center"}
                justify={"center"}
                color={"white"}
                rounded={"full"}
                bg={useColorModeValue("gray.100", "gray.700")}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={useColorModeValue("gray.500", "gray.200")}>{text}</Text>
        </Stack>
    );
};

export default FeatureBox;
