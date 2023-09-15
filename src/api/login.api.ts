/**
 * LOGIN APIS
 */
import axios from "../axiosConfig"
import { UserType } from "../pages/login/Login.types"

export const login = async (loginPayload: UserType) => {
    return axios.post(`login`, loginPayload)
}