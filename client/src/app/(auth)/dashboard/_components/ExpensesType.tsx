"use client"

import * as React from "react"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TransactionTypeTypes } from "@/types/transactionType"
const chartData = [
  { name: "Investimento", value: 50, fill: "var(--color-chrome)" },
  { name: "Receita", value: 200, fill: "var(--color-safari)" },
  { name: "Despesa", value: 287, fill: "var(--color-firefox)" },
]

const chartConfig = {
  visitors: {
    label: "expensesType",
  },
  chrome: {
    label: "Investimento",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Receita",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Despesa",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const typeConfig = {
  invested: {
    title: "Investimento",
    icon: <DollarSign size={14} color="blue" />,
  },
  revenue: {
    title: "Receita",
    icon: <TrendingUp size={14} color="green" />,
  },
  expense: {
    title: "Despesa",
    icon: <TrendingDown size={14} color="red" />,
  }
}

const TypeInformationItem = ({ type }: { type: TransactionTypeTypes }) => {
  const { title, icon } = typeConfig[type]
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-md bg-accent/20">
          {icon}
        </div>
        <p className="text-xs">{title}</p>
      </div>
      <p className="text-xs">99%</p>
    </div>
  )
}

const ExpensesType = () => {

  return (
    <Card className="flex flex-col">
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold pb-4">Gastos por categoria</h1>
        {/* <div className="flex items-center justify-between">
          <div>
            <TypeInformationItem type="invested" />
          </div>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[150px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                strokeWidth={20}
              >
                <Label
                />
              </Pie>
            </PieChart>
          </ChartContainer>

        </div> */}
      </CardContent>
    </Card>
  )
}

export default ExpensesType