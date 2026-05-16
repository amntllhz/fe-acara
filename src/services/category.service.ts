import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";

const categoryServices = {
    getCategories: (params?: string) =>
        instance.get(`${endpoint.CATEGORY}?${params}`),
    createCategory: (payload: { name: string, description: string, icon: string }) =>
        instance.post(endpoint.CATEGORY, payload),
}

export default categoryServices 