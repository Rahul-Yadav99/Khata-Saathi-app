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
    }
}

export default partyService