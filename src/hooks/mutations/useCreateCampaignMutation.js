import React from 'react'
import { useMutation, useQueryClient} from "react-query";
import client from '../../client';

const useCreateCampaignMutation = () => {

    const queryClient = useQueryClient();
    return useMutation(async ({ name, description, goal })=>{
        await client.createCampaign({ name, description, goal })
        queryClient.invalidateQueries("campaigns")
    })
}

export default useCreateCampaignMutation