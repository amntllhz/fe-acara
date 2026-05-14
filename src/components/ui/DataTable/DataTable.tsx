import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ReactNode } from "react"
import DataTableSearchBar from "./DataTableSearchBar"
import DataTableCreateButton from "./DataTableCreateButton"
import DataTableInfo from "./DataTableInfo"
import DataTableLimit from "./DataTableLimit"
import DataTablePagination from "./DataTablePagination"

interface Column {
    key: string
    label: string
}

interface DataItem {
    id: string
    [key: string]: unknown
}

interface DataTableToolbarProps {
    /** Search bar */
    search?: {
        value: string
        onChange: (value: string) => void
        placeholder?: string
    }
    /** Create button */
    onCreate?: () => void
    createLabel?: string
}

interface DataTableFooterProps {
    /** "Show X from Y" info */
    info?: {
        shown: number
        total: number
    }
    /** Limit selector */
    limit?: {
        value: number
        onChange: (value: number) => void
        options?: number[]
    }
    /** Pagination */
    pagination?: {
        page: number
        totalPages: number
        onPageChange: (page: number) => void
    }
}

interface PropTypes<T extends DataItem> {
    columns: Column[]
    data: T[]
    renderCell: (item: T, columnKey: string) => ReactNode
    toolbar?: DataTableToolbarProps
    footer?: DataTableFooterProps
}

const DataTable = <T extends DataItem>({
    columns,
    data,
    renderCell,
    toolbar,
    footer,
}: PropTypes<T>) => {
    const hasToolbar = toolbar && (toolbar.search || toolbar.onCreate)
    const hasFooter = footer && (footer.info || footer.limit || footer.pagination)

    return (
        <div className="flex flex-col gap-3">
            {/* ── Toolbar ── */}
            {hasToolbar && (
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        {toolbar.search && (
                            <DataTableSearchBar
                                value={toolbar.search.value}
                                onChange={toolbar.search.onChange}
                                placeholder={toolbar.search.placeholder}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {toolbar.onCreate && (
                            <DataTableCreateButton
                                onClick={toolbar.onCreate}
                                label={toolbar.createLabel}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* ── Table ── */}
            <div className="rounded-md border">
                <Table className="text-xs">
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.key} className="text-center text-muted-foreground">
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.key} className="text-center">
                                            <div className="flex justify-center items-center">
                                                {renderCell(item, column.key)}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Footer ── */}
            {hasFooter && (
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-4">
                        {footer.info && (
                            <DataTableInfo
                                shown={footer.info.shown}
                                total={footer.info.total}
                            />
                        )}
                        {footer.limit && (
                            <DataTableLimit
                                value={footer.limit.value}
                                onChange={footer.limit.onChange}
                                options={footer.limit.options}
                            />
                        )}
                    </div>
                    {footer.pagination && (
                        <DataTablePagination
                            page={footer.pagination.page}
                            totalPages={footer.pagination.totalPages}
                            onPageChange={footer.pagination.onPageChange}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default DataTable