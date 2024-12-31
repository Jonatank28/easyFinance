'use client'

import ReportIA from "@/components/ReportIA";
import CardInformation from "./_components/CardInformation";
import LatestTransactions from "./_components/LatestTransactions";
import SpendingCategory from "./_components/SpendingCategory";
import useDashboard from "@/hooks/useDashboard";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { floatToCurrency } from "@/lib/functions";
import { useSearchParams } from "next/navigation";

const DashboardPage = () => {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const { getData, data } = useDashboard()

  useEffect(() => {
    if (user?.id && month && year) {
      getData(user.id, month, year)
    }
  }, [user?.id, getData, month, year])

  return (data &&
    <div className="defaultWidth">
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
    </div>
  );
};

export default DashboardPage;