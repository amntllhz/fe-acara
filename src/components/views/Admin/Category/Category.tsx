import DataTable from "@/components/ui/DataTable"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { COLUMN_LISTS_CATEGORY, type Category } from "./Category.constant"
import { CiTrash, CiViewList } from "react-icons/ci"
import { LIMIT_LIST, LIMIT_DEFAULT, PAGE_DEFAULT, DELAY } from "@/constants/list.constant"
import useCategory from "./useCategory"
import AddCategoryModal from "./AddCategoryModal"
import DeleteCategoryModal from "./DeleteCategoryModal"

const CategoryPage = () => {
    const { push } = useRouter()
    const { limit, page, search: urlSearch, setURL, data, pagination, isLoading, refetch } = useCategory()

    // Local state for immediate input feedback
    const [inputValue, setInputValue] = useState(urlSearch)

    // Debounce the input value
    const debouncedSearch = useDebounce(inputValue, DELAY)

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

    // When the debounced value changes, update the URL
    useEffect(() => {
        if (debouncedSearch !== urlSearch) {
            setURL({ search: debouncedSearch, page: PAGE_DEFAULT })
        }
    }, [debouncedSearch])

    // If the URL changes from outside, sync the input box
    useEffect(() => {
        setInputValue(urlSearch)
    }, [urlSearch])

    const handlePageChange = (p: number) => setURL({ page: p })
    const handleLimitChange = (l: number) => setURL({ limit: l, page: PAGE_DEFAULT })
    const handleSearchChange = (v: string) => setInputValue(v) // Update local input immediately

    const renderCell = useCallback(
        (item: Category, columnKey: string): ReactNode => {
            switch (columnKey) {
                case "icon":
                    // Graceful fallback for legacy icons that aren't valid URLs
                    const isValidUrl = item.icon?.startsWith("http") || item.icon?.startsWith("/")
                    return isValidUrl ? (
                        <Image
                            src={item.icon}
                            alt={`icon ${item.name}`}
                            width={22}
                            height={22}
                            className="rounded-sm outline outline-gray-200 w-8 h-8 object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center text-[8px] text-gray-500 text-center px-2">
                            No Icon
                        </div>
                    )
                case "name":
                    return (
                        <span className="text-xs font-sans font-medium">
                            {item.name}
                        </span>
                    )
                case "description":
                    return (
                        <span className="text-xs font-sans text-muted-foreground lg:max-w-[280px] xs:max-w-[70px] truncate">
                            {item.description}
                        </span>
                    )
                case "action":
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="text-xs flex w-full"
                                    onClick={() => push(`/admin/category/${item._id}`)}
                                >
                                    <CiViewList className="mr-1 h-3 w-3" />
                                    Detail
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="w-full text-red-500 focus:text-red-500 text-xs flex"
                                    onClick={() => setDeleteTarget({ id: item._id, name: item.name })}>
                                    <CiTrash className="mr-1 h-3 w-3" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                default:
                    return null
            }
        },
        [push]
    )

    return (
        <>
            <DataTable
                isLoading={isLoading}
                columns={COLUMN_LISTS_CATEGORY}
                data={data || []}
                renderCell={renderCell}
                toolbar={{
                    search: {
                        value: inputValue, // Use the local input value for smooth typing
                        onChange: handleSearchChange,
                        placeholder: "Search category...",
                    },
                    onCreate: () => setIsAddModalOpen(true),
                    createLabel: "Add Category",
                }}
                footer={{
                    info: {
                        shown: data?.length || 0,
                        total: pagination?.total || 0,
                    },
                    limit: {
                        value: limit,
                        onChange: handleLimitChange,
                        options: LIMIT_LIST,
                    },
                    pagination: {
                        page: Number(pagination?.current) || page,
                        totalPages: pagination?.totalPages || 1,
                        onPageChange: handlePageChange,
                    },
                }}
            />

            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={() => {
                    setIsAddModalOpen(false);
                    refetch();
                }}
            />

            <DeleteCategoryModal
                isOpen={!!deleteTarget}
                categoryId={deleteTarget?.id ?? ""}
                categoryName={deleteTarget?.name ?? ""}
                onClose={() => setDeleteTarget(null)}
                onSuccess={() => {
                    setDeleteTarget(null);
                    refetch();
                }}
            />
        </>
    )
}

export default CategoryPage