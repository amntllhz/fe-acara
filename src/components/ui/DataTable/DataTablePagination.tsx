import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface DataTablePaginationProps {
    /** Current page (1-based) */
    page: number
    /** Total number of pages */
    totalPages: number
    onPageChange: (page: number) => void
}

const DataTablePagination = ({
    page,
    totalPages,
    onPageChange,
}: DataTablePaginationProps) => {
    const canPrev = page > 1
    const canNext = page < totalPages

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="outline"
                size="icon-sm"
                onClick={() => onPageChange(1)}
                disabled={!canPrev}
                aria-label="First page"
            >
                <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="outline"
                size="icon-sm"
                onClick={() => onPageChange(page - 1)}
                disabled={!canPrev}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-3.5 w-3.5" />
            </Button>

            <span className="text-xs text-muted-foreground px-2 min-w-20 text-center">
                Page{" "}
                <span className="font-medium text-foreground">{page}</span> of{" "}
                <span className="font-medium text-foreground">{totalPages}</span>
            </span>

            <Button
                variant="outline"
                size="icon-sm"
                onClick={() => onPageChange(page + 1)}
                disabled={!canNext}
                aria-label="Next page"
            >
                <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="outline"
                size="icon-sm"
                onClick={() => onPageChange(totalPages)}
                disabled={!canNext}
                aria-label="Last page"
            >
                <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
        </div>
    )
}

export default DataTablePagination
