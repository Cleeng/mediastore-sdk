export const periodMapper = {
  week: {
    label: 'W',
    peroid: 'week',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B'
  },
  month: {
    label: '1',
    peroid: 'month',
    color: '#AB68BC',
    bg: '#FBF0FF',
    border: '#AC61BF2B'
  },
  '3months': {
    label: '3',
    peroid: 'month',
    color: '#6399E3',
    bg: '#EDF3FF',
    border: '#DAE4FD'
  },
  '6months': {
    label: '6',
    peroid: 'month',
    color: '#7172C9',
    bg: '#F0F0FF',
    border: '#6163CD2E'
  },
  year: {
    label: '12',
    peroid: 'month',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E'
  },
  default: {
    label: 'S',
    peroid: '',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E'
  }
};

export const currencyFormat = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  '€': '€',
  $: '$',
  '£': '£'
};

export function dateFormat(timestamp) {
  const date = new Date(timestamp * 1000);
  const resultString = date.toLocaleDateString();
  return resultString;
}
