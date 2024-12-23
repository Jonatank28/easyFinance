import { Card, CardContent } from "@/components/ui/card"
import { floatToCurrency } from "@/lib/functions"
import { TransactionTypeTypes } from "@/types/transactionType"
import { Banknote } from "lucide-react"

type LastTransactionsTYpes = {
  id: number
  name: string
  value: number
  type: TransactionTypeTypes
  data: Date
}

const data: LastTransactionsTYpes[] = [
  { id: 1, name: "Arrumar carro", type: "invested", value: 1250.56, data: new Date() }, // Hoje
  { id: 2, name: "Investimento em ações", type: "expense", value: 500.00, data: new Date(new Date().setDate(new Date().getDate() - 1)) }, // Ontem
  { id: 3, name: "Investimento em criptomoedas", type: "revenue", value: 200.00, data: new Date(new Date().setDate(new Date().getDate() - 3)) }, // 3 dias atrás
  { id: 4, name: "Reforma no apartamento", type: "expense", value: 3000.00, data: new Date(new Date().setDate(new Date().getDate() - 7)) }, // 7 dias atrás (uma semana)
  { id: 5, name: "Curso de especialização", type: "revenue", value: 1200.00, data: new Date(new Date().setDate(new Date().getDate() - 10)) }, // 10 dias atrás
  { id: 6, name: "Compra de equipamentos", type: "expense", value: 450.00, data: new Date(new Date().setDate(new Date().getDate() - 15)) }, // 15 dias atrás
  { id: 7, name: "Investimento em startup", type: "expense", value: 10000.00, data: new Date(new Date().setDate(new Date().getDate() - 20)) }, // 20 dias atrás
  { id: 8, name: "Aporte em fundos imobiliários", type: "revenue", value: 1500.00, data: new Date(new Date().setDate(new Date().getDate() - 30)) }, // 30 dias atrás
  { id: 9, name: "Aquisição de ferramentas", type: "expense", value: 650.00, data: new Date(new Date().setDate(new Date().getDate() - 40)) }, // 40 dias atrás
  { id: 10, name: "Compra de software profissional", type: "expense", value: 300.00, data: new Date(new Date().setDate(new Date().getDate() - 50)) }, // 50 dias atrás
  { id: 11, name: "Criação de site para vendas", type: "revenue", value: 800.00, data: new Date(new Date().setDate(new Date().getDate() - 60)) }, // 60 dias atrás
  { id: 12, name: "Aulas de inglês", type: "expense", value: 400.00, data: new Date(new Date().setDate(new Date().getDate() - 70)) }, // 70 dias atrás
  { id: 13, name: "Licença para ferramentas digitais", type: "expense", value: 150.00, data: new Date(new Date().setDate(new Date().getDate() - 80)) }, // 80 dias atrás
  { id: 14, name: "Montagem de escritório em casa", type: "expense", value: 1800.00, data: new Date(new Date().setDate(new Date().getDate() - 90)) }, // 90 dias atrás
  { id: 15, name: "Compra de material para estudos", type: "revenue", value: 320.00, data: new Date(new Date().setDate(new Date().getDate() - 100)) }, // 100 dias atrás
  { id: 16, name: "Investimento em marketing digital", type: "expense", value: 500.00, data: new Date(new Date().setDate(new Date().getDate() - 110)) }, // 110 dias atrás
  { id: 17, name: "Aquisição de câmera profissional", type: "expense", value: 2800.00, data: new Date(new Date().setDate(new Date().getDate() - 120)) }, // 120 dias atrás
  { id: 18, name: "Compra de livros técnicos", type: "revenue", value: 250.00, data: new Date(new Date().setDate(new Date().getDate() - 130)) }, // 130 dias atrás
  { id: 19, name: "Inscrição em eventos de networking", type: "expense", value: 300.00, data: new Date(new Date().setDate(new Date().getDate() - 140)) }, // 140 dias atrás
  { id: 20, name: "Desenvolvimento de aplicativo", type: "expense", value: 5000.00, data: new Date(new Date().setDate(new Date().getDate() - 150)) }, // 150 dias atrás
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

const LatestTransactions = () => {

  function formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    // Formatação da data completa
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda-feira, ...

    // Se for "Hoje"
    if (diffInDays === 0) {
      return `Hoje - ${date.toLocaleString('pt-BR', options)}`;
    }

    // Se for "Ontem"
    if (diffInDays === 1) {
      return `Ontem - ${date.toLocaleString('pt-BR', options)}`;
    }

    // Se a data for antes do domingo da semana atual, exibe o nome do dia
    if (diffInDays < dayOfWeek) {
      return `${date.toLocaleString('pt-BR', { weekday: 'long' }).toUpperCase()} - ${date.toLocaleString('pt-BR', options).split(',')[1].trim()}`;
    }

    // Caso contrário, exibe a data completa
    return date.toLocaleString('pt-BR', options);
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold">Últimas transações</h1>
        <div className="space-y-4 lg:h-[76vh] lg:overflow-y-auto pt-10">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-between lg:pr-2">
              <div className="flex items-center gap-2">
                <div className="bg-accent rounded-xl p-2">
                  <Banknote size={18} />
                </div>
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs opacity-60">{formatDate(item.data)}</p>
                </div>
              </div>
              <p className={`${typeConfig[item.type].color}`}>{typeConfig[item.type].simbol} {floatToCurrency(item.value)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestTransactions