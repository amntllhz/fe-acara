import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constant";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import categoryServices from "@/services/category.service";

interface SetURLParams {
    limit?: number;
    page?: number;
    search?: string;
}

const useCategory = () => {
    const router = useRouter();
    
    // Parse query parameters, falling back to defaults
    const limit = Number(router.query.limit) || LIMIT_DEFAULT;
    const page = Number(router.query.page) || PAGE_DEFAULT;
    const search = (router.query.search as string) || "";

    // API State
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1, current: "1" });
    const [isLoading, setIsLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refetch = () => setRefreshTrigger(prev => prev + 1);

    // Fetch Data Effect
    useEffect(() => {
        if (!router.isReady) return;

        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                // Build the query string to pass to the service
                const queryObj: Record<string, string> = {
                    page: String(page),
                    limit: String(limit),
                };
                if (search) queryObj.search = search;
                const paramsString = new URLSearchParams(queryObj).toString();

                const response = await categoryServices.getCategories(paramsString);
                
                setData(response.data.data);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [router.isReady, page, limit, search, refreshTrigger]);

    const setURL = (params: SetURLParams) => {
        const newQuery: Record<string, any> = {
            ...router.query,
            limit: params.limit !== undefined ? params.limit : limit,
            page: params.page !== undefined ? params.page : page,
            search: params.search !== undefined ? params.search : search,
        };

        // Remove defaults/empty strings to keep the URL clean
        if (newQuery.search === "") delete newQuery.search;
        if (Number(newQuery.page) === PAGE_DEFAULT) delete newQuery.page;
        if (Number(newQuery.limit) === LIMIT_DEFAULT) delete newQuery.limit;

        router.replace(
            { query: newQuery },
            undefined,
            { shallow: true }
        );
    };

    return {
        limit,
        page,
        search,
        setURL,
        data,
        pagination,
        isLoading,
        refetch,
    };
};

export default useCategory;