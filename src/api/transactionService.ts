import { API_END_POINT } from "@/utils/constant"
import axios from "axios"

const transactionService = {
    getTransaction: async (partyId: string) => {
        try {
            const res = await axios.get(`${API_END_POINT}transactions/${partyId}`)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.message || error?.message || "Something went wrong"
        }
    },
    createTransaction: async (transaction: any) => {
        try {
            const res = await axios.post(`${API_END_POINT}transaction`, transaction)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.message || "Failed to create transaction"
        }
    },
    getTransactionById: async (transactionId: string) => {
        try {
            const res = await axios.get(`${API_END_POINT}transaction/${transactionId}`)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.message || "Failed to get transaction"
        }
    },
    updateTransaction: async (transactionId: string, transaction: any) => {
        try {
            const res = await axios.put(`${API_END_POINT}transaction/${transactionId}`, transaction)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.message || "Failed to update transaction"
        }
    },
    deleteTransaction: async (transactionId: string) => {
        try {
            const res = await axios.delete(`${API_END_POINT}transaction/${transactionId}`)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.message || "Failed to delete transaction"
        }
    }
}


export default transactionService