"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryGetAllByUserIdSchema = void 0;
const zod_1 = require("zod");
const CategoryGetAllByUserIdSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty("userId deve ser uma string não vazia."),
});
exports.CategoryGetAllByUserIdSchema = CategoryGetAllByUserIdSchema;
