interface DataTableInfoProps {
    /** Number of rows currently shown on this page */
    shown: number
    /** Total number of records (across all pages) */
    total: number
}

const DataTableInfo = ({ shown, total }: DataTableInfoProps) => {
    return (
        <p className="text-xs text-muted-foreground">
            Show:{" "}
            <span className="font-medium text-foreground">{shown}</span> from{" "}
            <span className="font-medium text-foreground">{total}</span>
        </p>
    )
}

export default DataTableInfo
