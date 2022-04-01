import React from 'react'
import { useMutation, useQueryClient } from "react-query";
import client from '../../client';

const useContributeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(async ({ campaignId, amount }) => {
        await client.contribute({ campaignId, amount })
        queryClient.invalidateQueries("campaigns")
    })
}

export default useContributeMutation