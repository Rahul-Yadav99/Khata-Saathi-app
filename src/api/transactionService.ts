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
    }
}


export default transactionService