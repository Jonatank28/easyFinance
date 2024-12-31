import { z } from "zod";

const userCreateSchema = z.object({
  userId: z.string().nonempty("userId deve ser uma string não vazia."),
  name: z.string().nonempty("name deve ser uma string não vazia."),
  email: z
    .string()
    .email("email inválido")
    .nonempty("email deve ser uma string não vazia."),
  photo: z
    .string()
    .url("photo deve ser uma URL válida.")
    .regex(/^(http|https):\/\//, "photo deve começar com http ou https.")
    .nonempty("photo deve ser uma string não vazia."),
});

export { userCreateSchema };
