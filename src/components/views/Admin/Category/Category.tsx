import DataTable from "@/components/ui/DataTable"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"
import { MoreHorizontal } from "lucide-react"
import { COLUMN_LISTS_CATEGORY, DUMMY_CATEGORY, type Category } from "./Category.constant"
import { CiTrash, CiViewList } from "react-icons/ci"

const CategoryPage = () => {
    const { push } = useRouter()

    const renderCell = useCallback(
        (item: Category, columnKey: string): ReactNode => {
            switch (columnKey) {
                case "icon":
                    return (
                        <Image
                            src={item.icon}
                            alt={`icon ${item.name}`}
                            width={48}
                            height={48}
                            className="rounded-sm outline outline-gray-200 object-cover"
                        />
                    )
                case "name":
                    return (
                        <span className="text-xs font-sans font-medium">
                            {item.name}
                        </span>
                    )
                case "description":
                    return (
                        <span className="text-xs font-sans text-muted-foreground">
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
                                    className="w-full text-red-500 focus:text-red-500 text-xs flex">
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
        <DataTable
            columns={COLUMN_LISTS_CATEGORY}
            data={DUMMY_CATEGORY}
            renderCell={renderCell}
        />
    )
}

export default CategoryPage