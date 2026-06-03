import { CiCircleInfo, CiEdit, CiEraser } from "react-icons/ci"
import { Skeleton } from "@heroui/react"
import useDetailCategory from "./useDetailCategory"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LuPencilLine } from "react-icons/lu"
import UpdateCategoryModal from "./UpdateCategoryModal"

const DetailCategory = () => {
    const { dataCategory, refetch, isLoading } = useDetailCategory()
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [prevIcon, setPrevIcon] = useState<string | undefined>(undefined)

    const currentIcon = dataCategory?.icon

    if (currentIcon !== prevIcon) {
        setPrevIcon(currentIcon)
        setIsImageLoading(true)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    return (
        <>
            <div className="flex border border-gray-200 rounded-lg bg-white p-4 mt-2 gap-6 lg:w-1/2 xs:w-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                            <CiCircleInfo className="text-xs" />
                            <p className="text-xs font-medium">Information</p>
                        </div>
                        <div>
                            <Button onClick={() => setIsUpdateModalOpen(true)} size="sm" variant="default" className="cursor-pointer bg-white text-gray-500">
                                Edit
                                <LuPencilLine />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="relative h-12 w-12 rounded-sm overflow-hidden bg-gray-50 flex items-center justify-center">
                            {isImageLoading && (
                                <Skeleton className="absolute inset-0 bg-gray-200" />
                            )}
                            {currentIcon && (
                                <img
                                    src={currentIcon}
                                    key={currentIcon}
                                    alt={dataCategory?.name || "Category icon"}
                                    className={`h-12 w-12 object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                    onLoad={() => setIsImageLoading(false)}
                                    onError={() => setIsImageLoading(false)}
                                />
                            )}
                            {!currentIcon && !isImageLoading && (
                                <span className="text-[10px] text-gray-400">No Image</span>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-y-1 md:gap-y-2 gap-x-4 w-full">
                        <p className="text-xs text-gray-500 md:mt-0 mt-1">Name</p>
                        {isLoading
                            ? <Skeleton className="h-3 w-32 rounded-md" />
                            : <p className="text-xs">{dataCategory?.name}</p>
                        }

                        <p className="text-xs text-gray-500 md:mt-0 mt-1">Description</p>
                        {isLoading
                            ? <div className="flex flex-col gap-1">
                                <Skeleton className="h-3 w-full rounded-md" />
                                <Skeleton className="h-3 w-2/3 rounded-md" />
                                <Skeleton className="h-3 w-2/3 rounded-md" />
                            </div>
                            : <p className="text-xs text-justify">{dataCategory?.description}</p>
                        }

                        <p className="text-xs text-gray-500 md:mt-0 mt-1">Created at</p>
                        {isLoading
                            ? <Skeleton className="h-3 w-24 rounded-md" />
                            : <p className="text-xs">{formatDate(dataCategory?.createdAt)}</p>
                        }
                    </div>
                </div>
            </div>

            <UpdateCategoryModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSuccess={() => {
                    setIsUpdateModalOpen(false)
                    refetch()
                }}
                category={dataCategory ?? null}
            />
        </>
    )
}

export default DetailCategory