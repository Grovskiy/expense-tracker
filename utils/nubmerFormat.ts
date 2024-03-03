export const numberFormat = (code: string, value: number) => {
  const codeMap = new Map([
    ['USD', 'en-IN'],
    ['EUR', 'es-ES'],
    ['UAH', 'uk-UK'],
  ]);
  return Intl.NumberFormat(codeMap.get(code), {
    style: 'currency',
    currency: code,
    maximumSignificantDigits: 3,
  }).format(value);
};
