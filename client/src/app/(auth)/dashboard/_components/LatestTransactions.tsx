'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useDashboard from "@/hooks/useDashboard"
import { floatToCurrency, formatDate } from "@/lib/functions"
import { Banknote } from "lucide-react"
import { useRouter } from "next/navigation"
import useGetParams from "@/hooks/useGetParams"

const typeConfig = {
  investment: {
    color: "text-blue-400",
    simbol: "+"
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
  const { data } = useDashboard()
  const params = useGetParams()
  const router = useRouter()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-2xl font-bold">Últimas transações</h1>
          <Button variant='secondary' onClick={() => router.push(`/transaction?year=${params.year}&&month=${params.month}`)}>Ver todos</Button>
        </div>
        <div className="pt-6 space-y-4 lg:overflow-y-auto lg:h-[calc(100vh-227px)]">
          {data.lastTransactions.map((item, index) => (
            <div key={index} className="flex items-center justify-between lg:pr-2">
              <div className="flex items-center gap-2">
                <div className="bg-accent rounded-xl p-2">
                  <Banknote size={18} />
                </div>
                <div>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-black/40 dark:text-white/40">{formatDate(new Date(item.date))}</p>
                </div>
              </div>
              <p className={`${typeConfig[item.type].color} text-sm`}>{typeConfig[item.type].simbol} {floatToCurrency(item.value)}</p>
            </div>
          ))}
        </div>
      </CardContent >
    </Card >
  )
}

export default LatestTransactions
