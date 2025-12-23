import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { ApplicationItem } from "@/lib/db/schema"
import { cn } from "@/lib/utils"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import { SearchIcon } from "lucide-react"
import * as React from "react"
import { columns } from "./columns"

export function ApplicationsTable({
  data,
  isLoading,
}: { data: ApplicationItem[]; isLoading: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const id = React.useId()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getRowId: (row) => row.id.toString(),

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 relative">
          <Input
            id={`${id}-input`}
            type="text"
            ref={inputRef}
            className={cn(
              "peer min-w-60 ps-9 focus-visible:ring-0 rounded-md h-8",
            )}
            value={(table.getColumn("name")?.getFilterValue() ?? "") as string}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value as string)
            }
            placeholder="Search applications... "
            aria-label="Filter by candidate name"
          />
          <div className="text-muted-foreground/40 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2 p-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 py-2.5">
              <Skeleton className="size-8" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-96" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-8 w-48" />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border [&>div]:max-h-[350px] overflow-y-auto snap-y scroll-pb-0">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-muted backdrop-blur-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "relative select-none truncate border-b border-border [&>.cursor-col-resize]:last:opacity-0",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              id="content"
              tabIndex={-1}
              className="relative transition-colors focus-visible:outline"
            >
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      onClick={() => row.toggleSelected()}
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="h-11"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <React.Fragment>
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No applications found.
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
