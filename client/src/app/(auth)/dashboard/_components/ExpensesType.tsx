// import { Card, CardContent } from "@/components/ui/card"

// const data = {
//   expense: 25,
//   revenue: 53,
//   invested: 22
// }

// const ExpensesType = () => {
//   return (
//     <Card>
//       <CardContent className="p-4">
//         <h1 className="text-2xl font-bold">Gastos por tipo</h1>
//       </CardContent>
//     </Card>
//   )
// }
// export default ExpensesType

"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const ExpensesType = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold">Porcentagem por tipo</h1>
        {/* <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  )
}

export default ExpensesType