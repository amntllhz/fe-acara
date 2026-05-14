import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

interface DataTablePaginationProps {
    /** Current page (1-based) */
    page: number
    /** Total number of pages */
    totalPages: number
    onPageChange: (page: number) => void
}

function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (page <= 3) return [1, 2, 3, "...", totalPages]
    if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", page - 1, page, page + 1, "...", totalPages]
}

const DataTablePagination = ({
    page,
    totalPages,
    onPageChange,
}: DataTablePaginationProps) => {
    const pageNumbers = getPageNumbers(page, totalPages)

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => page > 1 && onPageChange(page - 1)}
                            aria-disabled={page === 1}
                            className={page === 1 ? "pointer-events-none opacity-50 text-[11px]" : "cursor-pointer text-[11px]"}
                        />
                    </PaginationItem>

                    {pageNumbers.map((p, i) =>
                        p === "..." ? (
                            <PaginationItem key={`ellipsis-${i}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={p === page}
                                    onClick={() => onPageChange(p as number)}
                                    className={cn("cursor-pointer text-[10px]", p === page ? "text-main bg-main/5 hover:bg-main/5 hover:text-main" : "")}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => page < totalPages && onPageChange(page + 1)}
                            aria-disabled={page === totalPages}
                            className={page === totalPages ? "pointer-events-none opacity-40 text-[11px]" : "cursor-pointer text-[11px]"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default DataTablePagination