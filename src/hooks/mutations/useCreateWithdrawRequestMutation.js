import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import client from '../../client'

const useCreateWithdrawRequestMutation = () => {
    const queryClient = useQueryClient()
    return useMutation(async ({ campaignId, amount, beneficiary, description }) => {
        const request = await client.createWithdrawalRequest({ campaignId, amount, beneficiary, description });
        queryClient.invalidateQueries("withdrawrequests")
        return request;
    })
}

export default useCreateWithdrawRequestMutation