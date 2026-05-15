import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constanta";

const categoryServices = {
    getCategories: (params?: string) =>
        instance.get(`${endpoint.CATEGORY}?${params}`)
}

export default categoryServices 