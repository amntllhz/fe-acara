import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DataTableSearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const DataTableSearchBar = ({
    value,
    onChange,
    placeholder = "Search...",
}: DataTableSearchBarProps) => {
    return (
        <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-8 w-56 text-xs h-8"
            />
        </div>
    )
}

export default DataTableSearchBar
