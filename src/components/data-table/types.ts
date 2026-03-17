import type { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]

    // pagination
    page?: number
    pageSize?: number
    totalElements?: number

    // sorting (server-side)
    sort?: string
    onSortChange?: (sort: string) => void

    // loading
    loading?: boolean

    // handlers
    onPageChange?: (page: number) => void
}

export interface PageRequest {
    page: number
    size: number
    sort?: string
    search?: string
    filters?: Record<string, unknown>
}

export interface PageResponse<T> {
    data: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}