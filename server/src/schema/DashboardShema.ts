import { z } from "zod";

const getDataDashboardSchema = z.object({
  userId: z.string().nonempty("userId deve ser uma string não vazia."),
});

export { getDataDashboardSchema };
