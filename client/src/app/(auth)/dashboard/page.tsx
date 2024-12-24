import ReportIA from "@/components/ReportIA";
import CardInformation from "./_components/CardInformation";
import LatestTransactions from "./_components/LatestTransactions";
import ExpensesType from "./_components/ExpensesType";
import SpendingCategory from "./_components/SpendingCategory";

const DashboardPage = async () => {
  return (
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
            value='11,00'
            type="balance"
            addTransaction
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <CardInformation
              value='00,00'
              type="invested"
            />
            <CardInformation
              value='11,00'
              type="revenue"
            />
            <CardInformation
              value='11,00'
              type="expense"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
            <ExpensesType />
            <SpendingCategory />
          </div>
        </div>
        <LatestTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;