import axios from "axios";
import { ReturnType } from "../types/Common";

const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_API_ADDRESS;

export const jsonConnection = axios.create({
    baseURL: BACKEND_ADDRESS,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
    }
})

jsonConnection.interceptors.response.use( // TODO : 에러코드별 예외 처리
    (response)=> { return response },

)