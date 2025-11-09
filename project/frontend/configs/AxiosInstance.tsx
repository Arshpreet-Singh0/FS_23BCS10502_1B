import { BACKEND_URL } from "@/constants/constant";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : BACKEND_URL,
    withCredentials : true
})