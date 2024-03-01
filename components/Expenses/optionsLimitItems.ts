export const numbersArray = (): string[] => {
  const start = 5;
  const end = 50;
  const step = 5;

  const numbersArray = [];
  for (let i = start; i <= end; i += step) {
    numbersArray.push(`${i}`);
  }
  return numbersArray;
};
