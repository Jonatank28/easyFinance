import { parse, isValid, endOfMonth } from "date-fns";

/**
 * Valida e retorna uma data formatada no primeiro dia do mês.
 * @param year - Ano fornecido
 * @param month - Mês fornecido
 * @returns Date - Data válida
 * @throws Error se o formato do ano ou mês for inválido
 */
export const validateDateInput = (year: string, month: string): Date => {
  if (Number(year) < 1000) {
    [year, month] = [month, year];
  }

  if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
    throw new Error("Invalid year or month format");
  }

  const parsedDate = parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date());
  if (!isValid(parsedDate)) {
    throw new Error("Invalid year or month format");
  }

  return parsedDate;
};

/**
 * Retorna o final do mês baseado na data fornecida.
 * @param date - Data inicial
 * @returns Date - Último dia do mês
 */
export const getEndOfMonth = (date: Date): Date => {
  return endOfMonth(date);
};
