import DefaultIcon from "@/components/DefaultIcon"
import { Button } from "@/components/ui/button"
import { floatToCurrency, formatDate } from "@/lib/functions"
import { TransactionTypeTypes } from "@/types/transactionType"
import { ColumnDef } from "@tanstack/react-table"
import Actions from "./Actions"
import { TransactionTypes } from "@/types/transaction"

export const columns: ColumnDef<TransactionTypes>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as TransactionTypeTypes
      const formatType = type === "expense" ? "Despesa" : type === "revenue" ? "Receita" : "Investimento"
      return (
        <div> {formatType}</div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Valor
        <DefaultIcon name="ArrowUpDown" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("value"))
      const formatted = floatToCurrency(value)

      return <div className="text-left pl-4">{formatted}</div>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Data
        <DefaultIcon name="ArrowUpDown" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))

      return <div className="text-left pl-2">{formatDate(date)}</div>
    },
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <Actions row={transaction} />
      )
    },
  },
]