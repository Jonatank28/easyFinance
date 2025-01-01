/**
 * Formata uma data para exibição personalizada no padrão brasileiro.
 * @param {Date} date A data a ser formatada.
 * @returns {string} Uma string formatada com base na diferença de dias (Hoje, Ontem ou nome do dia da semana).
 *
 * Exemplo:
 * Entrada: new Date("2023-12-22T10:00:00")
 * Saída: "Hoje - 22/12/23 10:00"
 */
const formatDate = (date: Date): string => {
  const now = new Date();

  const todayStart = new Date(now.setHours(0, 0, 0, 0));

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  if (date >= todayStart) {
    return `Hoje - ${date.toLocaleString("pt-BR", options)}`;
  }

  if (date >= yesterdayStart && date < todayStart) {
    return `Ontem - ${date.toLocaleString("pt-BR", options)}`;
  }

  return `${
    date.toLocaleString("pt-BR", { weekday: "long" }).charAt(0).toUpperCase() +
    date.toLocaleString("pt-BR", { weekday: "long" }).slice(1)
  } - ${date.toLocaleString("pt-BR", options)}`;
};

// ________________________________________________________________________________________________________________________________
/**
 * Converte um número ou string para uma representação de moeda brasileira (R$).
 * @param {number | string} value O valor a ser convertido.
 * @returns {string} Uma string formatada como moeda brasileira.
 *
 * Exemplo:
 * Entrada: 1234.56
 * Saída: "R$ 1.234,56"
 */
const floatToCurrency = (value: number | string): string => {
  return Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

// ________________________________________________________________________________________________________________________________
/**
 * Converte uma string de moeda brasileira para um número flutuante.
 * @param {string} value A string de moeda a ser convertida.
 * @returns {number} O valor numérico correspondente.
 *
 * Exemplo:
 * Entrada: "R$ 1.234,56"
 * Saída: 1234.56
 */
const currencyToFloat = (value: string): number => {
  if (value === "") return 0;
  let numericString = value.replace(/[^\d,.-]/g, "");
  numericString = numericString.replace(/\./g, "");
  numericString = numericString.replace(/,/, ".");
  return parseFloat(numericString);
};

// Exporta todas as funções auxiliares para uso em outros módulos
export {
  formatDate, // Formata datas de acordo com regras específicas.
  floatToCurrency, // Converte um valor float para formato de moeda.
  currencyToFloat, // Converte uma string de moeda para float.
};
