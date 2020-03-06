export const periodMapper = {
  week: {
    label: 'W',
    peroid: 'week',
    color: '#65CDE5',
    bg: '#E9F7FA'
  },
  month: {
    label: '1',
    peroid: 'month',
    color: '#76A3F5',
    bg: '#EEF4FF'
  },
  '3month': {
    label: '3',
    peroid: 'month',
    color: '#EBB46D',
    bg: '#FCF5EC'
  },
  '6months': {
    label: '6',
    peroid: 'month',
    color: '#AF60AA',
    bg: '#F5E9F3'
  },
  year: {
    label: '12',
    peroid: 'month',
    color: '#83CBBB',
    bg: '#EDF8F4'
  }
};

export const currencyFormat = {
  EUR: '€',
  USD: '$',
  GBP: '£'
};

const monthArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function dateFormat(timestamp) {
  const date = new Date(timestamp * 1000);
  const monthNumber = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const resultString = `${monthArray[monthNumber]} ${getOrdinal(day)}, ${year}`;
  return resultString;
}
