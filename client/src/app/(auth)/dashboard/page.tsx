import ReportIA from "@/components/ReportIA";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import CardInformation from "./_components/CardInformation";

const DashboardPage = async () => {
  return (
    <div className="defaultWidth h-full flex flex-col">
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ReportIA />
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-4 flex-1 py-2">
        <div className="grid grid-rows-[auto_auto_1fr] gap-4">
          <CardInformation
            value='11,00'
            type="balance"
          />
          <div className="flex justify-between gap-4 ">
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
          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <Card>
              <CardContent className="p-4">
                <h1 className="text-2xl font-bold">Últimas transações</h1>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h1 className="text-2xl font-bold">Últimas transações</h1>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card>
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold">Últimas transações</h1>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;