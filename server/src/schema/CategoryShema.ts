import { z } from "zod";

const CategoryGetAllByUserIdSchema = z.object({
  userId: z.string().nonempty("userId deve ser uma string não vazia."),
});

export { CategoryGetAllByUserIdSchema };
