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
  '3months': {
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
  },
  default: {
    label: 'S',
    peroid: '',
    color: '#83CBBB',
    bg: '#EDF8F4'
  }
};

export const currencyFormat = {
  EUR: '€',
  USD: '$',
  GBP: '£'
};

export function dateFormat(timestamp) {
  const date = new Date(timestamp * 1000);
  const resultString = date.toLocaleDateString();
  return resultString;
}
