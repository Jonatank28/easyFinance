import { Button } from "@/components/ui/button"
import { TransactionTypes } from "@/types/transaction"
import { Table as ReactTable } from "@tanstack/react-table"

interface PaginationProps {
  table: ReactTable<TransactionTypes>
  paginationWindow: number[]
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ table, paginationWindow, setPageIndex }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length}
        {table.getFilteredRowModel().rows.length === 1 ? " registro" : " registros"}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        {paginationWindow.map((page) => (
          <Button
            key={page}
            variant={page === table.getState().pagination.pageIndex ? "default" : "outline"}
            size="sm"
            onClick={() => setPageIndex(page)}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, table.getPageCount() - 1))}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

export default Pagination
