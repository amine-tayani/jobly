import { Checkbox } from "@/components/ui/checkbox"
import type { ApplicationItem } from "@/lib/db/schema"
import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../data-table-column-header"
import { Button } from "../ui/button"

const searchJobFilterFn: FilterFn<ApplicationItem> = (
  row,
  columnId,
  filterValue: string,
) => {
  const value = String(row.getValue(columnId) ?? "").toLowerCase()
  const searchTerm = String(filterValue ?? "").toLowerCase()
  return value.includes(searchTerm)
}

// Column definitions
export const columns: ColumnDef<ApplicationItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pr-1.5">
        <Checkbox
          className="size-3.5"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center pr-1.5">
        <Checkbox
          className="size-3.5"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.name}
      </div>
    ),
    filterFn: searchJobFilterFn,
    enableSorting: false,

  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.email}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "position",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.position}
      </div>
    ),
  },
  {
    accessorKey: "resumeUrl",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resume" />
    ),
    cell: ({ row }) => (
      <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600">
        <a
          href={row.original.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download PDF
        </a>
      </Button>
    ),
  },
]
