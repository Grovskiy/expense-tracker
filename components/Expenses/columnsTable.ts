export const columnsTable = (isIncome: boolean | undefined) =>
  isIncome ? arrayIncomes : arrayExpenses;

const arrayExpenses = [
  {
    key: 'categoryName',
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
    key: 'currencyName',
    label: 'Валюта',
  },
  {
    key: 'date',
    label: 'Дата',
  },
  {
    key: 'actions'
  }
];
const arrayIncomes = [
  {
    key: 'categoryName',
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
    key: 'currencyName',
    label: 'Валюта',
  },
  {
    key: 'date',
    label: 'Дата',
  },
  {
    key: 'actions'
  }
];
