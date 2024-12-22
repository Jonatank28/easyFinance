import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const index = async () => {
  return (
    <div className="defaultWidth">
      <div className="mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant='ghost' className="rounded-xl font-bold">
            Relatótio IA
            <Bot />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;