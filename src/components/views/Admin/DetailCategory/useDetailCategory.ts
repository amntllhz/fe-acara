import categoryServices from "@/services/category.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailCategory = () => {
    const { query, isReady } = useRouter()

    const getCategoryById = async (id: string) => {
        const { data } = await categoryServices.getCategoryById(id)
        return data.data
    }

    const { data: dataCategory, refetch } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getCategoryById(String(query.id)),
        enabled: isReady,
    })

    return {
        dataCategory,
        refetch
    }
}

export default useDetailCategory