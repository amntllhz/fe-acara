import environment from "@/config/environment";
import { SessionExtended } from "@/types/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
    "Content-Type": "application/json"    
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000
});

instance.interceptors.response.use(
    async(request) => {
        const session: SessionExtended | null = await getSession();
        if(session && session.accessToken){ 
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    (response) => response,   
    (error) => Promise.reject(error)
);

export default instance;
