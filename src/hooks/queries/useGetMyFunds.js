import React from 'react'
import { useQuery } from 'react-query'
import client from '../../client'

const useGetMyFunds = () => {
    return useQuery(["campaigns", "created"], async () => {
        const campaigns = await client.getCampaignsCreatedBySender();
        return campaigns;
    })
}

export default useGetMyFunds