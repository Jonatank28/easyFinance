/**
 * Formata um valor numérico em uma string de moeda brasileira (BRL).
 *
 * @param value - O valor numérico como string a ser formatado.
 * @returns O valor formatado como uma string no formato de moeda brasileira.
 *
 * Exemplo:
 * Recebe: "120"
 * Retorna: "R$ 1,20"
 */
const maskCurrency = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  const numberValue = parseFloat(cleanValue);
  if (isNaN(numberValue)) {
    return "R$ 0,00";
  }
  const decimalValue = numberValue / 100;
  return decimalValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export { maskCurrency };
