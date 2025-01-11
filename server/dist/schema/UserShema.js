"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateSchema = void 0;
const zod_1 = require("zod");
const userCreateSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty("userId deve ser uma string não vazia."),
    name: zod_1.z.string().nonempty("name deve ser uma string não vazia."),
    email: zod_1.z
        .string()
        .email("email inválido")
        .nonempty("email deve ser uma string não vazia."),
    photo: zod_1.z
        .string()
        .url("photo deve ser uma URL válida.")
        .regex(/^(http|https):\/\//, "photo deve começar com http ou https.")
        .nonempty("photo deve ser uma string não vazia."),
});
exports.userCreateSchema = userCreateSchema;
