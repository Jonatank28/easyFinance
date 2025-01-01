'use client'

import ReportIA from "@/components/ReportIA"
import CardInformation from "./CardInformation"
import { floatToCurrency } from "@/lib/functions"
import SpendingCategory from "./SpendingCategory"
import LatestTransactions from "./LatestTransactions"
import useDashboard from "@/hooks/useDashboard"

const Body = () => {
  const { data } = useDashboard()
  return (
    <>
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ReportIA />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 py-2 ">
        <div className="grid grid-rows-[auto_auto_1fr] gap-4">
          <CardInformation
            value={floatToCurrency(data.valuesInformation.balance)}
            type="balance"
            addTransaction
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <CardInformation
              value={floatToCurrency(data.valuesInformation.investment)}
              type="invested"
            />
            <CardInformation
              value={floatToCurrency(data.valuesInformation.revenue)}
              type="revenue"
            />
            <CardInformation
              value={floatToCurrency(data.valuesInformation.expense)}
              type="expense"
            />
          </div>
          <div>
            <SpendingCategory />
          </div>
        </div>
        <LatestTransactions />
      </div>
    </>
  )

}

export default Body