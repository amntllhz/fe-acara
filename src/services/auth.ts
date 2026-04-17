import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";
import { IRegister } from "@/types/auth";

const authServices = {
    register: (payload: IRegister) => instance.post(`${endpoint.AUTH}/register`, payload),
}

export default authServices