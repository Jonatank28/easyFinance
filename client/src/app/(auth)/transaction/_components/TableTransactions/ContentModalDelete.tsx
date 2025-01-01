import { floatToCurrency, formatDate } from "@/lib/functions";
import { TransactionTypes } from "@/types/transaction";

const ContentModalDelete = ({ row }: { row: TransactionTypes }) => {
  return (
    <div>
      <h1>Tem certeza que deseja excluir essa transação? </h1>
      <div className="space-y-2 opacity-60 text-sm pt-3">
        <hr />
        <p>Descrição: {row.description}</p>
        <p>Tipo: {row.type}</p>
        <p>Categoria: {row.category}</p>
        <p>Valor: {floatToCurrency(row.value)}</p>
        <p>Data: {formatDate(new Date(row.date))}</p>
      </div>
    </div>
  )
}

export default ContentModalDelete