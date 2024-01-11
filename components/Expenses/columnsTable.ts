export const columnsTable = (isIncome: boolean | undefined) =>
  isIncome ? arrayIncomes : arrayExpenses;

const arrayExpenses = [
  {
    key: 'categoryId',
    label: 'Категорія',
  },
  {
    key: 'notes',
    label: 'Нотатки',
  },
  {
    key: 'value',
    label: 'Сума',
  },
  {
    key: 'currencyId',
    label: 'Валюта',
  },
  {
    key: 'date',
    label: 'Дата',
  },
];
const arrayIncomes = [
  {
    key: 'categoryId',
    label: 'Категорія',
  },
  {
    key: 'notes',
    label: 'Нотатки',
  },
  {
    key: 'value',
    label: 'Сума',
  },
  {
    key: 'tax',
    label: 'Податок',
  },
  {
    key: 'currencyId',
    label: 'Валюта',
  },
  {
    key: 'date',
    label: 'Дата',
  },
];
