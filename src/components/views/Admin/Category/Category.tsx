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
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import uploadService from "@/services/upload.service"
import categoryServices from "@/services/category.service"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input, TextArea } from "@heroui/react"
import { Label } from "@/components/ui/label"
import { LuImageUp } from "react-icons/lu"
import { Spinner } from "@/components/ui/spinner"
import { RiExchange2Line } from "react-icons/ri"

const categorySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    icon: yup.string().required("Icon is required"),
})

const CategoryPage = () => {
    const { push } = useRouter()
    const { limit, page, search: urlSearch, setURL, data, pagination, isLoading, refetch } = useCategory()

    // Local state for immediate input feedback
    const [inputValue, setInputValue] = useState(urlSearch)

    // Debounce the input value
    const debouncedSearch = useDebounce(inputValue, DELAY)

    // Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            icon: "",
        },
    })

    const iconUrl = watch("icon")

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

    const handleFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await uploadService.uploadFile(formData)
            // Cloudinary backend response has the URL in secure_url
            const uploadedUrl = res.data?.data?.secure_url || res.data?.secure_url
            if (uploadedUrl) {
                setIsImageLoading(true)
                setValue("icon", uploadedUrl, { shouldValidate: true })
            }
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const onCancelModal = () => {
        // Close modal and reset form instantly for best UX
        setIsAddModalOpen(false)
        reset()
        setIsUploading(false)
        setIsImageLoading(false)

        // Let the cleanup run silently in the background
        if (iconUrl) {
            uploadService.deleteFile({ fileUrl: iconUrl }).catch((error) => {
                console.error("Failed to delete orphaned file", error)
            })
        }
    }

    const onSubmit = async (formData: any) => {
        try {
            await categoryServices.createCategory(formData)
            setIsAddModalOpen(false)
            reset()
            refetch()
        } catch (error) {
            console.error("Failed to create category:", error)
        }
    }

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

            <Dialog open={isAddModalOpen} onOpenChange={(open) => {
                if (!open) onCancelModal()
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription className="text-xs">
                            Fill in the details below to create a new category.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-xs mb-1.5 block">Name</Label>
                            <Controller name="name" control={control} render={({ field, fieldState }) => (
                                <>
                                    <Input {...field} aria-label="name" type="text" autoComplete="off" placeholder="Category Name" className={`input rounded-md placeholder-gray-300 shadow-none ring-1 w-full text-xs font-sans ${fieldState.error ? "ring-main" : "ring-gray-200/75"}`} />
                                    {fieldState.error && <p className="text-[9px] text-main font-sans mt-1">{fieldState.error.message}</p>}
                                </>
                            )} />
                        </div>

                        <div>
                            <Label htmlFor="description" className="text-xs mb-1.5 block">Description</Label>
                            <Controller name="description" control={control} render={({ field, fieldState }) => (
                                <>
                                    <TextArea {...field} aria-label="description" placeholder="Category Description" className={`input rounded-md placeholder-gray-300 shadow-none ring-1 w-full text-xs font-sans ${fieldState.error ? "ring-main" : "ring-gray-200/75"}`} />
                                    {fieldState.error && <p className="text-[9px] text-main font-sans mt-1">{fieldState.error.message}</p>}
                                </>
                            )} />
                        </div>

                        <div>
                            <Label className="text-xs mb-1.5">Icon</Label>
                            <div className={`mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-50 transition ${errors.icon ? "border-main" : "border-gray-200/75"}`}>
                                {(isUploading || isImageLoading) && (
                                    <div className="flex flex-col items-center gap-2">
                                        <Spinner />
                                        <p className="text-xs text-gray-400">
                                            {isUploading ? "Uploading..." : "Rendering preview..."}
                                        </p>
                                    </div>
                                )}

                                {iconUrl && (
                                    <div className={`flex flex-col items-center gap-3 ${isImageLoading ? 'opacity-0 absolute' : 'flex'}`}>
                                        <Image
                                            src={iconUrl}
                                            alt="Preview"
                                            width={64}
                                            height={64}
                                            className="rounded object-cover"
                                            onLoad={() => setIsImageLoading(false)}
                                        />
                                        <div className="flex items-center gap-1">
                                            <RiExchange2Line className="h-3 w-3 text-main" />
                                            <p className="text-xs text-main">Click to replace</p>
                                        </div>
                                    </div>
                                )}

                                {(!isUploading && !isImageLoading && !iconUrl) && (
                                    <div className="flex flex-col items-center gap-2">
                                        <LuImageUp className="h-10 w-10 text-gray-300" />
                                        <p className="text-xs text-gray-300">Click or drag file to upload</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileDrop}
                                    disabled={isUploading || isImageLoading || isSubmitting}
                                />
                            </div>
                            {errors.icon && <p className="text-[9px] text-main font-sans mt-1">{errors.icon.message}</p>}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={onCancelModal} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-main" disabled={isSubmitting || isUploading}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CategoryPage