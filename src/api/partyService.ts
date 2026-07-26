import { API_END_POINT } from "@/utils/constant";
import axios from "axios";

const partyService = {
    getAllParties: async () => {
        try {
            const res = await axios.get(`${API_END_POINT}party`)
            return res.data;
        } catch (error: any) {
            error?.response?.data?.message || error?.message || "Something went wrong"
        }
    },
    createParty: async (party: any) => {
        try {
            const res = await axios.post(`${API_END_POINT}party`, party)
            return res.data;
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.response?.data?.message || 'Failed to create Customer'
        }
    },
    getPartyById: async (partyId: string) => {
        try {
            const res = await axios.get(`${API_END_POINT}party/${partyId}`)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.message || "Failed to get party"
        }
    },
    updateParty: async (partyId: string, party: any) => {
        try {
            const res = await axios.put(`${API_END_POINT}party/${partyId}`, party)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.response?.data?.message || "Failed to update customer"
        }
    },
    deleteParty: async (partyId: string) => {
        try {
            const res = await axios.delete(`${API_END_POINT}party/${partyId}`)
            return res.data
        } catch (error: any) {
            throw error?.response?.data?.details?.[0] || error?.response?.data?.message || "Failed to delete customer"
        }
    },

}

export default partyService