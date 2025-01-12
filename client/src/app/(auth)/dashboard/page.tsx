import { Suspense } from "react";
import Body from "./_components/Body";

const DashboardPage = () => {

  return (
    <div className="defaultWidth">
      <Suspense>
        <Body />
      </Suspense>
    </div>
  );
};

export default DashboardPage;