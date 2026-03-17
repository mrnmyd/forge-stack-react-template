import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTablePagination } from "./data-table-pagination"
import type { DataTableProps } from "./types"

export function DataTable<T>({
    data,
    columns,

    page,
    pageSize,
    totalElements,

    sort,
    onSortChange,

    loading,
    onPageChange,
}: DataTableProps<T>) {
    const [columnVisibility, setColumnVisibility] = React.useState({})

    const isPaginated =
        page !== undefined &&
        pageSize !== undefined &&
        totalElements !== undefined &&
        onPageChange !== undefined

    // parse sort string → TanStack format
    const sortingState = React.useMemo(() => {
        if (!sort) return []
        const [id, dir] = sort.split(",")
        return [{ id, desc: dir === "desc" }]
    }, [sort])

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            sorting: sortingState,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),

        manualSorting: true,
        manualPagination: isPaginated,
        pageCount: isPaginated
            ? Math.ceil(totalElements! / pageSize!)
            : undefined,
    })

    const handleSort = (columnId: string) => {
        if (!onSortChange) return

        let newSort = `${columnId},asc`

        if (sort?.startsWith(columnId)) {
            if (sort.endsWith("asc")) {
                newSort = `${columnId},desc`
            } else {
                newSort = ""
            }
        }

        onSortChange(newSort)
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((c) => c.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => {
                                    const columnId = header.column.id
                                    const isSorted = sort?.startsWith(columnId)

                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={() => handleSort(columnId)}
                                            className="cursor-pointer select-none"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {isSorted &&
                                                (sort?.endsWith("asc") ? " ↑" : " ↓")}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            Array.from({
                                length: pageSize ?? 10,
                            }).map((_, rowIndex) => (
                                <TableRow key={`skeleton-${rowIndex}`}>
                                    {columns.map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length ? (
                            data.map((row, i) => (
                                <TableRow key={i}>
                                    {table.getAllColumns().map((column) => {
                                        if (!column.getIsVisible()) return null

                                        const value = (row as any)[column.id]

                                        return (
                                            <TableCell key={column.id}>
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {isPaginated && (
                <DataTablePagination
                    page={page!}
                    pageSize={pageSize!}
                    totalElements={totalElements!}
                    onPageChange={onPageChange!}
                />
            )}
        </div>
    )
}