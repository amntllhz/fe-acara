import { Skeleton } from "@heroui/react"
import useDetailCategory from "./useDetailCategory"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LuPencilLine } from "react-icons/lu"
import UpdateCategoryModal from "./UpdateCategoryModal"
import { CiCalendar, CiCircleInfo, CiEdit } from "react-icons/ci"

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
        if (!dateString) return "-"
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear())
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${day}-${month}-${year} ${hours}:${minutes}`
    }

    return (
        <>
            <div className="flex flex-col gap-4 mt-2">

                {/* ── Hero Card ── */}
                <div className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div className="h-20 bg-linear-to-r from-main to-main/50 -mt-5" />

                    {/* Icon + name + action */}
                    <div className="flex justify-between items-end p-6 -mt-14">
                        <div className="flex flex-col gap-2">
                            {/* Icon */}
                            <div className="relative h-16 w-16 rounded-xl shadow-sm bg-white flex items-center justify-center">
                                {isImageLoading && (
                                    <Skeleton className="absolute inset-0 bg-gray-100" />
                                )}
                                {currentIcon ? (
                                    <img
                                        key={currentIcon}
                                        src={currentIcon}
                                        alt={dataCategory?.name || "Category icon"}
                                        className={`h-16 w-16 object-cover rounded-xl p-1 transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() => setIsImageLoading(false)}
                                    />
                                ) : !isImageLoading && (
                                    <span className="text-[10px] text-gray-400">No Icon</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-0.5">
                                {/* Name */}
                                {isLoading
                                    ? <Skeleton className="h-4 w-36 rounded-md " />
                                    : <p className="text-sm font-semibold text-foreground">{dataCategory?.name}</p>
                                }

                                {/* Created at */}
                                <div className="flex items-center gap-1">
                                    <CiCalendar className="h-3 w-3 text-muted-foreground" />
                                    {isLoading
                                        ? <Skeleton className="h-3 w-24 rounded-md" />
                                        : <p className="text-[10px] text-muted-foreground">{formatDate(dataCategory?.createdAt)}</p>
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Edit button */}
                        <Button
                            onClick={() => setIsUpdateModalOpen(true)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer text-gray-500 text-xs"
                        >
                            <LuPencilLine className="h-3 w-3" />
                            Edit
                        </Button>

                    </div>

                </div>

                {/* ── Info Card ── */}
                <div className="w-full border border-gray-200 rounded-lg bg-white p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <CiCircleInfo className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Information</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-4 gap-x-6">
                        <p className="text-xs text-muted-foreground">Name</p>
                        {isLoading
                            ? <Skeleton className="h-3 w-32 rounded-md" />
                            : <p className="text-xs font-medium">{dataCategory?.name}</p>
                        }

                        <p className="text-xs text-muted-foreground">Description</p>
                        {isLoading
                            ? <div className="flex flex-col gap-1.5">
                                <Skeleton className="h-3 w-full rounded-md" />
                                <Skeleton className="h-3 w-4/5 rounded-md" />
                                <Skeleton className="h-3 w-2/3 rounded-md" />
                            </div>
                            : <p className="text-xs text-justify leading-relaxed">{dataCategory?.description}</p>
                        }

                        <p className="text-xs text-muted-foreground">Created at</p>
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