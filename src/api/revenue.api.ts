/**
 * REVENUE APIS
 */
import axios from "../axiosConfig"

export const getRevenueData = async (params?: Record<string, unknown>) => {
    return axios.get(`getRevenue`, {params})
}

export const getRevenueChartData = async (params?: Record<string, unknown>) => {
    return axios.get(`pivot-chart`, {params})
}