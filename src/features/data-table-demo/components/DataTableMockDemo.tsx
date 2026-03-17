import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/data-table/data-table"

// ---------------- TYPES ----------------

type User = {
    id: number
    name: string
    email: string
    role: "ADMIN" | "USER" | "MANAGER"
    status: "ACTIVE" | "INACTIVE"
    createdAt: string
}

// ---------------- MOCK DATA ----------------

const generateMockUsers = (count: number): User[] => {
    const roles = ["ADMIN", "USER", "MANAGER"] as const
    const statuses = ["ACTIVE", "INACTIVE"] as const

    return Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        createdAt: new Date(
            Date.now() - i * 86400000
        ).toISOString(),
    }))
}

const ALL_USERS = generateMockUsers(137)

// ---------------- MOCK API ----------------

const mockFetchUsers = async ({
    page,
    size,
    sort,
}: {
    page: number
    size: number
    sort?: string
}) => {
    await new Promise((res) => setTimeout(res, 500)) // simulate latency

    let data = [...ALL_USERS]

    // server-side sorting
    if (sort) {
        const [field, direction] = sort.split(",")

        data.sort((a: any, b: any) => {
            if (a[field] < b[field]) return direction === "asc" ? -1 : 1
            if (a[field] > b[field]) return direction === "asc" ? 1 : -1
            return 0
        })
    }

    const start = page * size
    const end = start + size

    return {
        data: data.slice(start, end),
        page,
        size,
        totalElements: data.length,
        totalPages: Math.ceil(data.length / size),
    }
}

// ---------------- COMPONENT ----------------

export function DataTableDemoPage() {
    const [page, setPage] = React.useState(0)
    const [pageSize] = React.useState(10)
    const [sort, setSort] = React.useState<string>("")

    const { data, isLoading } = useQuery({
        queryKey: ["users", page, pageSize, sort],
        queryFn: () =>
            mockFetchUsers({
                page,
                size: pageSize,
                sort,
            }),
    })

    const columns: ColumnDef<User>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "status", header: "Status" },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) =>
                new Date(getValue<string>()).toLocaleDateString(),
        },
    ]

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-semibold">Table Demo</h1>

            <DataTable
                columns={columns}
                data={data?.data ?? []}
                page={data?.page}
                pageSize={data?.size}
                totalElements={data?.totalElements}
                sort={sort}
                onSortChange={(newSort) => {
                    setSort(newSort)
                    setPage(0) // reset page on sort
                }}
                loading={isLoading}
                onPageChange={setPage}
            />
        </div>
    )
}


/*
// ---------------- EXAMPLE ----------------

const [page, setPage] = useState(0)
const [sort, setSort] = useState("")

const { data, isLoading } = useQuery({
queryKey: ["users", page, sort],
queryFn: () => fetchUsers({ page, size: 10, sort }),
})

<DataTable
columns={columns}
data={data?.data ?? []}
page={data?.page}
pageSize={data?.size}
totalElements={data?.totalElements}
sort={sort}
onSortChange={setSort}
loading={isLoading}
onPageChange={setPage}
/>
*/