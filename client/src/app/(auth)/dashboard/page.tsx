import ReportIA from "@/components/ReportIA";

const DashboardPage = async () => {
  return (
    <div className="defaultWidth">
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <ReportIA />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;