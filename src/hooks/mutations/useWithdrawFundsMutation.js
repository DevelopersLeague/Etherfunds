import React from 'react'
import {useMutation, useQueryClient} from 'react-query'
import client from '../../client'

export default function useWithdrawFundsMutation() {
    const queryClient = useQueryClient()
    return useMutation(async({campaignId, amount, beneficiary})=>{
        await client.withdrawFunds({campaignId, amount, beneficiary})
        queryClient.invalidateQueries('campaigns')
    })
}
