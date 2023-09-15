/**
 * REVENUE APIS
 */
import axios from "../axiosConfig"

export const getRevenueData = async () => {
    return axios.get(`getRevenue`)
}