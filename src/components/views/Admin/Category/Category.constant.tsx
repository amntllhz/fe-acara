export interface CategoryColumn {
    key: string
    label: string
}

export interface Category {
    id: string
    _id: string
    icon: string
    name: string
    description: string
    [key: string]: unknown
}

export const COLUMN_LISTS_CATEGORY: CategoryColumn[] = [
    { key: "icon", label: "Icon" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "action", label: "Action" },
]