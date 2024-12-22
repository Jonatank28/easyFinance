import { Card, CardContent } from "@/components/ui/card"
import { Wallet, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

type Types = "balance" | "invested" | "revenue" | "expense"

interface Props {
  value: string
  type: Types
}

const typeConfig = {
  balance: {
    title: "Saldo",
    icon: <Wallet size={16} />,
    bgIcon: "bg-muted dark:bg-background",
    sizeValue: "text-3xl"
  },
  invested: {
    title: "Investido",
    icon: <DollarSign size={16} />,
    bgIcon: "bg-muted",
    sizeValue: "text-2xl"
  },
  revenue: {
    title: "Receita",
    icon: <TrendingUp size={16} color="green" />,
    bgIcon: "bg-primary/10",
    sizeValue: "text-2xl"
  },
  expense: {
    title: "Despesa",
    icon: <TrendingDown size={16} color="red" />,
    bgIcon: "bg-destructive/10",
    sizeValue: "text-2xl"
  }
}

const CardInformation = ({ value, type }: Props) => {
  const { title, icon, bgIcon, sizeValue } = typeConfig[type]

  return (
    <Card className="w-full">
      <CardContent className={`p-6 space-y-8 rounded-xl ${type === "balance" && "bg-popover"}`}>
        <div className="flex items-end gap-2">
          <div className={`p-2 rounded-md ${bgIcon}`}>{icon}</div>
          <p>{title}</p>
        </div>
        <div>
          <h1 className={`${sizeValue} font-bold`}>R$ {value}</h1>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardInformation
