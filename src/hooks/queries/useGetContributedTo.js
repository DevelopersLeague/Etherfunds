import React from 'react'
import { useQuery } from 'react-query'
import client from '../../client'

const useGetContributedTo = () => {
    return useQuery(["campaigns", "contributed"], async () => {
        const campaigns = await client.getCampaignsContributedBySender();
        return campaigns;
    })
}

export default useGetContributedTo