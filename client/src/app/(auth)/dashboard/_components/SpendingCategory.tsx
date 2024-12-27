import { Card, CardContent } from "@/components/ui/card"

const data = [
  {
    name: "Alimentação",
    value: 25
  },
  {
    name: "Mercado",
    value: 25
  },
  {
    name: "Casa",
    value: 50
  },
  {
    name: "Alimentação",
    value: 25
  },
  {
    name: "Mercado",
    value: 25
  },
  {
    name: "Casa",
    value: 50
  },
  {
    name: "Alimentação",
    value: 25
  },
  {
    name: "Mercado",
    value: 25
  },
  {
    name: "Casa",
    value: 50
  },
  {
    name: "Alimentação",
    value: 25
  },
  {
    name: "Mercado",
    value: 25
  },
  {
    name: "Casa",
    value: 50
  },

]

const SpendingCategory = () => {

  const colors = [
    "bg-orange-500", "bg-green-500", "bg-blue-500", "bg-red-500",
    "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-blue-500",
    "bg-gray-500", "bg-cyan-500", "bg-indigo-500", "bg-lime-500",
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <h1 className="text-2xl font-bold pb-4">Gastos por categoria</h1>
        <div className="pt-6 space-y-4 lg:h-[calc(100vh-551px)] overflow-y-auto">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between pb-1 lg:pr-2">
                <p className="text-xs">{item.name}</p>
                <p className="text-xs">{item.value}%</p>
              </div>
              <div className="h-2 bg-muted rounded-full relative lg:mr-2 -z-10">
                <div
                  className={`absolute inset-0 rounded-full ${colors[index % colors.length]}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SpendingCategory
