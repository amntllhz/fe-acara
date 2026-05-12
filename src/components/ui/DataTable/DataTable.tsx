import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ReactNode } from "react"

interface Column {
    key: string
    label: string
}

interface DataItem {
    id: string
    [key: string]: unknown
}

interface PropTypes<T extends DataItem> {
    columns: Column[]
    data: T[]
    renderCell: (item: T, columnKey: string) => ReactNode
}

const DataTable = <T extends DataItem>({ columns, data, renderCell }: PropTypes<T>) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key} className="text-xs font-sans text-muted-foreground">
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="py-10 text-center font-sans text-xs text-muted-foreground">
                                No data available
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(item, column.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable