import {
    SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableLimitProps {
    value: number
    onChange: (value: number) => void
    options?: number[]
}

const DataTableLimit = ({
    value,
    onChange,
    options = [5, 10, 25, 50, 100],
}: DataTableLimitProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
                Rows per page
            </span>
            <SelectRoot
                value={String(value)}
                onValueChange={(val) => onChange(Number(val))}
            >
                <SelectTrigger className="h-8 w-16 text-xs">
                    <SelectValue placeholder={String(value)} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt} value={String(opt)} className="text-xs">
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </div>
    )
}

export default DataTableLimit
