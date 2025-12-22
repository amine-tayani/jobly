import { Checkbox } from "@/components/ui/checkbox"
import type { JobItem } from "@/lib/db/schema"
import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableColumnType } from "../data-table-column-type"

const searchJobFilterFn: FilterFn<JobItem> = (
  row,
  columnId,
  filterValue: string,
) => {
  const value = String(row.getValue(columnId) ?? "").toLowerCase()
  const searchTerm = String(filterValue ?? "").toLowerCase()
  return value.includes(searchTerm)
}

// Column definitions
export const columns: ColumnDef<JobItem>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground pl-2">
        {row.original.title}
      </div>
    ),
    filterFn: searchJobFilterFn,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    enableSorting: false,
    cell: ({ row }) => <DataTableColumnType type={row.original.type} />,
  },
  {
    accessorKey: "location",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
  },
  {
    accessorKey: "department",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "description",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" className="truncate" />
    ),
  },
]
