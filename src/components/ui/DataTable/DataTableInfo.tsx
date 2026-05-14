import { cn } from "@heroui/styles"

interface DataTableInfoProps {
    /** Number of rows currently shown on this page */
    shown: number
    /** Total number of records (across all pages) */
    total: number
    className?: string
}

const DataTableInfo = ({ shown, total, className }: DataTableInfoProps) => {
    return (
        <p className={cn("text-[10px] text-muted-foreground", className)}>
            Show : {" "}
            <span className="font-medium text-foreground">{shown}</span> from{" "}
            <span className="font-medium text-foreground">{total}</span>
        </p>
    )
}

export default DataTableInfo
