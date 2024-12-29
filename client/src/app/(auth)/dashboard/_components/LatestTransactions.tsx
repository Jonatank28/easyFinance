import { Card, CardContent } from "@/components/ui/card"
import { floatToCurrency, formatDate } from "@/lib/functions"
import { TransactionTypeTypes } from "@/types/transactionType"
import { Banknote } from "lucide-react"

type LastTransactionsTypes = {
  description: string
  value: number
  type: TransactionTypeTypes
  date: Date
}

const data: LastTransactionsTypes[] = [
  { description: "Arrumar carro", type: "invested", value: 1250.56, date: new Date() }, // Hoje
  { description: "Investimento em ações", type: "expense", value: 500.00, date: new Date(new Date().setDate(new Date().getDate() - 1)) }, // Ontem
  { description: "Investimento em criptomoedas", type: "revenue", value: 200.00, date: new Date(new Date().setDate(new Date().getDate() - 3)) }, // 3 dias atrás
  { description: "Reforma no apartamento", type: "expense", value: 3000.00, date: new Date(new Date().setDate(new Date().getDate() - 7)) }, // 7 dias atrás (uma semana)
  { description: "Curso de especialização", type: "revenue", value: 1200.00, date: new Date(new Date().setDate(new Date().getDate() - 10)) }, // 10 dias atrás
  { description: "Compra de equipamentos", type: "expense", value: 450.00, date: new Date(new Date().setDate(new Date().getDate() - 15)) }, // 15 dias atrás
  { description: "Investimento em startup", type: "expense", value: 10000.00, date: new Date(new Date().setDate(new Date().getDate() - 20)) }, // 20 dias atrás
  { description: "Aporte em fundos imobiliários", type: "revenue", value: 1500.00, date: new Date(new Date().setDate(new Date().getDate() - 30)) }, // 30 dias atrás
  { description: "Aquisição de ferramentas", type: "expense", value: 650.00, date: new Date(new Date().setDate(new Date().getDate() - 40)) }, // 40 dias atrás
  { description: "Compra de software profissional", type: "expense", value: 300.00, date: new Date(new Date().setDate(new Date().getDate() - 50)) }, // 50 dias atrás
  { description: "Criação de site para vendas", type: "revenue", value: 800.00, date: new Date(new Date().setDate(new Date().getDate() - 60)) }, // 60 dias atrás
  { description: "Aulas de inglês", type: "expense", value: 400.00, date: new Date(new Date().setDate(new Date().getDate() - 70)) }, // 70 dias atrás
  { description: "Licença para ferramentas digitais", type: "expense", value: 150.00, date: new Date(new Date().setDate(new Date().getDate() - 80)) }, // 80 dias atrás
  { description: "Montagem de escritório em casa", type: "expense", value: 1800.00, date: new Date(new Date().setDate(new Date().getDate() - 90)) }, // 90 dias atrás
  { description: "Compra de material para estudos", type: "revenue", value: 320.00, date: new Date(new Date().setDate(new Date().getDate() - 100)) }, // 100 dias atrás
  { description: "Investimento em marketing digital", type: "expense", value: 500.00, date: new Date(new Date().setDate(new Date().getDate() - 110)) }, // 110 dias atrás
  { description: "Aquisição de câmera profissional", type: "expense", value: 2800.00, date: new Date(new Date().setDate(new Date().getDate() - 120)) }, // 120 dias atrás
  { description: "Compra de livros técnicos", type: "revenue", value: 250.00, date: new Date(new Date().setDate(new Date().getDate() - 130)) }, // 130 dias atrás
  { description: "Inscrição em eventos de networking", type: "expense", value: 300.00, date: new Date(new Date().setDate(new Date().getDate() - 140)) }, // 140 dias atrás
  { description: "Desenvolvimento de aplicativo", type: "expense", value: 5000.00, date: new Date(new Date().setDate(new Date().getDate() - 150)) }, // 150 dias atrás
];


const typeConfig = {
  invested: {
    color: "text-blue-400",
    simbol: "$"
  },
  revenue: {
    color: "text-primary",
    simbol: "+"
  },
  expense: {
    color: "text-destructive",
    simbol: "-"
  }
}

const LatestTransactions = async () => {

  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold pb-4">Gastos por categoria</h1>
        <div className="pt-6 space-y-4 lg:overflow-y-auto lg:h-[calc(100vh-223px)]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between lg:pr-2">
              <div className="flex items-center gap-2">
                <div className="bg-accent rounded-xl p-2">
                  <Banknote size={18} />
                </div>
                <div>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-black/40 dark:text-white/40">{formatDate(item.date)}</p>
                </div>
              </div>
              <p className={`${typeConfig[item.type].color} text-sm`}>{typeConfig[item.type].simbol} {floatToCurrency(item.value)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestTransactions
