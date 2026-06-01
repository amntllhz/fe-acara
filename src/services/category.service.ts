import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";

const categoryServices = {
    getCategories: (params?: string) =>
        instance.get(`${endpoint.CATEGORY}?${params}`),
    getCategoryById: (id: string) =>
        instance.get(`${endpoint.CATEGORY}/${id}`),
    createCategory: (payload: { name: string, description: string, icon: string }) =>
        instance.post(endpoint.CATEGORY, payload),
    deleteCategory: (id: string) =>
        instance.delete(`${endpoint.CATEGORY}/${id}`),
    updateCategory: (id: string, payload: { name: string, description: string, icon: string }) =>
        instance.put(`${endpoint.CATEGORY}/${id}`, payload),
}

export default categoryServices 