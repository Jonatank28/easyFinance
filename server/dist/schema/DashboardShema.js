"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataDashboardSchema = void 0;
const zod_1 = require("zod");
const getDataDashboardSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty("userId deve ser uma string não vazia."),
    month: zod_1.z.string().nonempty("month deve ser uma string não vazia."),
    year: zod_1.z.string().nonempty("year deve ser uma string não vazia."),
});
exports.getDataDashboardSchema = getDataDashboardSchema;
