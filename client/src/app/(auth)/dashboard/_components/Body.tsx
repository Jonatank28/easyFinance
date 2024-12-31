'use client'

import ReportIA from "@/components/ReportIA"
import CardInformation from "./CardInformation"
import { floatToCurrency } from "@/lib/functions"
import SpendingCategory from "./SpendingCategory"
import LatestTransactions from "./LatestTransactions"
import { useUser } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import useDashboard from "@/hooks/useDashboard"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"

const Body = () => {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const { getData, data } = useDashboard()
  const { setUser } = useAuth()

  useEffect(() => {
    if (user?.id && month && parseInt(month) > 0 && year) {
      getData(user.id, month, year)
      const formatDataUser = {
        userId: user.id,
        name: user.fullName || "",
        email: user.emailAddresses[0].emailAddress,
        photo: user.imageUrl
      }
      setUser(formatDataUser)
    }
  }, [user?.id, getData, setUser])
  return (
    <>
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ReportIA />
        </div>aaa
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