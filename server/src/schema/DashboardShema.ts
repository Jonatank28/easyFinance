import { z } from "zod";

const getDataDashboardSchema = z.object({
  userId: z.string().nonempty("userId deve ser uma string não vazia."),
  month: z.string().nonempty("month deve ser uma string não vazia."),
  year: z.string().nonempty("year deve ser uma string não vazia."),
});

export { getDataDashboardSchema };
