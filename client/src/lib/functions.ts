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
  return value.toLocaleString("pt-br", {
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
  floatToCurrency, // Converte um valor float para formato de moeda.
  currencyToFloat, // Converte uma string de moeda para float.
};
