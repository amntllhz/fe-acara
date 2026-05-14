import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DataTableCreateButtonProps {
    onClick: () => void
    label?: string
}

const DataTableCreateButton = ({
    onClick,
    label = "Create",
}: DataTableCreateButtonProps) => {
    return (
        <Button size="sm" onClick={onClick} className="h-8 gap-1.5 text-xs bg-main">
            <Plus className="h-3.5 w-3.5" />
            {label}
        </Button>
    )
}

export default DataTableCreateButton
