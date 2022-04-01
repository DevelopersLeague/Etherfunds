import React from 'react'
import { useQuery } from 'react-query'
import client from '../../client'

const useGetAllCampaigns = () => {
    return useQuery(["campaigns"], async()=>{
        const campaigns = await client.getAllCampaigns();
        return campaigns;
    })
}

export default useGetAllCampaigns