import { Input } from "@/components/ui/input"
import { Table as ReactTable } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import DefaultIcon from "@/components/DefaultIcon"
import { Payment } from "@/types/payment"

interface Props {
  table: ReactTable<Payment>
}

const Filter = ({ table }: Props) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filtrar por descrição..."
        value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("description")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2 md:ml-auto">
            <DefaultIcon name="ChevronDown" />
            Colunas
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Filter