"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfMonth = exports.validateDateInput = void 0;
const date_fns_1 = require("date-fns");
/**
 * Valida e retorna uma data formatada no primeiro dia do mês.
 * @param year - Ano fornecido
 * @param month - Mês fornecido
 * @returns Date - Data válida
 * @throws Error se o formato do ano ou mês for inválido
 */
const validateDateInput = (year, month) => {
    if (Number(year) < 1000) {
        [year, month] = [month, year];
    }
    if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
        throw new Error("Invalid year or month format");
    }
    const parsedDate = (0, date_fns_1.parse)(`${year}-${month}-01`, "yyyy-MM-dd", new Date());
    if (!(0, date_fns_1.isValid)(parsedDate)) {
        throw new Error("Invalid year or month format");
    }
    return parsedDate;
};
exports.validateDateInput = validateDateInput;
/**
 * Retorna o final do mês baseado na data fornecida.
 * @param date - Data inicial
 * @returns Date - Último dia do mês
 */
const getEndOfMonth = (date) => {
    return (0, date_fns_1.endOfMonth)(date);
};
exports.getEndOfMonth = getEndOfMonth;
