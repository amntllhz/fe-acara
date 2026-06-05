import { useRouter } from "next/router"
import DashboardLayout from "@/components/layouts/DashboardLayout/DashboardLayout"
import useDetailCategory from "@/components/views/Admin/DetailCategory/useDetailCategory"
import DetailCategory from "@/components/views/Admin/DetailCategory/DetailCategory"
import { LuChevronLeft } from "react-icons/lu"

const DetailCategoryPage = () => {
    const { push } = useRouter()
    const { dataCategory, isLoading } = useDetailCategory()

    return (
        <DashboardLayout
            title={dataCategory?.name}
            type="admin"
            header={
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => push("/admin/category")}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                        >
                            <LuChevronLeft className="w-4 h-4" />
                        </button>
                        <h1 className="font-sans text-lg font-semibold text-main tracking-wide">
                            {isLoading ? "Loading..." : dataCategory?.name ?? "Detail Category"}
                        </h1>
                    </div>
                    <p className="font-sans text-xs text-gray-600 ml-8">
                        Showing the details of a specific category
                    </p>
                </div>
            }
        >
            <DetailCategory />
        </DashboardLayout>
    )
}

export default DetailCategoryPage