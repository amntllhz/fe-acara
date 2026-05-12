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

export const DUMMY_CATEGORY: Category[] = [
    {
        id: "1",
        _id: "64f1a2b3c4d5e6f7a8b9c0d1",
        icon: "/images/general/logo.png",
        name: "Acara",
        description: "Kategori untuk acara umum",
    },
    {
        id: "2",
        _id: "64f1a2b3c4d5e6f7a8b9c0d2",
        icon: "/images/general/logo.png",
        name: "Konser",
        description: "Kategori untuk konser musik",
    },
    {
        id: "3",
        _id: "64f1a2b3c4d5e6f7a8b9c0d3",
        icon: "/images/general/logo.png",
        name: "Olahraga",
        description: "Kategori untuk event olahraga",
    },
]