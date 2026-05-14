import {
    SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@heroui/styles"

interface DataTableLimitProps {
    value: number
    onChange: (value: number) => void
    options?: number[]
    className?: string
}

const DataTableLimit = ({
    value,
    onChange,
    options = [5, 10, 25, 50, 100],
    className,
}: DataTableLimitProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                Rows per page
            </span>
            <SelectRoot
                value={String(value)}
                onValueChange={(val) => onChange(Number(val))}
            >
                <SelectTrigger className="h-8 w-15 text-[10px]">
                    <SelectValue placeholder={String(value)} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt} value={String(opt)} className="text-[10px]">
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </div>
    )
}

export default DataTableLimit
