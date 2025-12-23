import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

import type { JobItem } from "@/lib/db/schema"
import {
  FilterIcon, SearchIcon, TrashIcon
} from "lucide-react"
import * as React from "react"
import { columns } from "./columns"
import { DeleteJobDialog } from "./delete-job-dialog"
import { CreateJobSheet } from "./sheet"

export function JobsTable({
  data,
  isLoading,
}: { data: JobItem[]; isLoading: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const id = React.useId()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [isJobSheetOpen, setIsJobSheetOpen] =
    React.useState(false)
  const [isDeleteJobDialogOpen, setDeleteJobDialogOpen] =
    React.useState(false)

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

  const uniqueTypeValues = React.useMemo(() => {
    const typeColumn = table.getColumn("type")

    if (!typeColumn) return []

    const values = Array.from(typeColumn.getFacetedUniqueValues().keys())

    return values.sort()
  }, [table.getColumn("type")?.getFacetedUniqueValues()])

  const jobTypeCounts = React.useMemo(() => {
    const typeColumn = table.getColumn("type")
    if (!typeColumn) return new Map()
    return typeColumn.getFacetedUniqueValues()
  }, [table.getColumn("type")?.getFacetedUniqueValues()])

  const selectedTypes = React.useMemo(() => {
    const filterValue = table.getColumn("type")?.getFilterValue() as string[]
    return filterValue ?? []
  }, [table.getColumn("type")?.getFilterValue()])

  const handleTypeChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("type")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table
      .getColumn("type")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }


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
            value={
              (table.getColumn("title")?.getFilterValue() ?? "") as string
            }
            onChange={(e) =>
              table
                .getColumn("title")
                ?.setFilterValue(e.target.value as string)
            }
            placeholder="Search jobs... "
            aria-label="Filter by title"
          />
          <div className="text-muted-foreground/40 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" aria-hidden="true" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 shadow-none border-border">
                <FilterIcon
                  className="-ms-1 text-muted-foreground/50"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground/80">Filter by type</span>
                {selectedTypes.length > 0 && (
                  <span className="text-muted-foreground/70 -me-1 inline-flex h-4 max-h-full items-center rounded border px-1 text-[0.625rem] font-medium">
                    {selectedTypes.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-40 p-3 " align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {uniqueTypeValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedTypes.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleTypeChange(checked, value)
                        }
                      />
                      <Label className="flex grow justify-between gap-2 font-normal">
                        {value}{" "}
                        <span className="text-muted-foreground ms-2 text-xs">
                          {jobTypeCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

        </div>
        <div className="flex items-center gap-3">
          <div>
            {table.getSelectedRowModel().rows.length > 0 && (
              <Button
                onClick={() => setDeleteJobDialogOpen(true)}
                variant="outline"
                size="sm"
              >
                <TrashIcon className="size-4 text-muted-foreground/50" />
                <span className="hidden lg:inline">
                  Delete{" "}
                  {table.getSelectedRowModel().rows.length > 0 && (
                    <span className="text-xs">
                      ({table.getSelectedRowModel().rows.length})
                    </span>
                  )}
                </span>
              </Button>
            )}
            {isDeleteJobDialogOpen && (
              <DeleteJobDialog
                jobIds={table.getSelectedRowModel().rows.map((row) => row.id)}
                isOpen={isDeleteJobDialogOpen}
                setIsOpen={setDeleteJobDialogOpen}
              />
            )}
          </div>

          <Button
            size="sm"
            className="border-border shadow-none bg-orange-500 hover:bg-orange-600"
            onClick={() => setIsJobSheetOpen(true)}
          >
            Add new job
          </Button>
          <CreateJobSheet
            open={isJobSheetOpen}
            onOpenChange={setIsJobSheetOpen}
          />
        </div>
      </div >

      {
        isLoading ? (
          <div className="space-y-2 p-1" >
            {
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4 py-2.5">
                  <Skeleton className="size-8" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-96" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-72" />
                  <Skeleton className="h-8 w-48" />
                </div>
              ))
            }
          </div>
        ) : (
          <div className="rounded-lg border [&>div]:max-h-[350px] overflow-y-auto snap-y scroll-pb-0">
            <Table>
              <TableHeader className="sticky top-0 z-20 bg-muted backdrop-blur-xs">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                  >
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
                        Empty job table.
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )}
              </TableBody>
            </Table>
          </div>
        )
      }
    </>
  )
}
