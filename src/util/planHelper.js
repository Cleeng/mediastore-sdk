export const periodMapper = {
  // Subscription and season pass
  day: {
    label: 'D',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B',
    chargedForEveryText: 'day',
    accessText: 'Daily'
  },
  week: {
    label: 'W',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B',
    chargedForEveryText: 'week',
    accessText: 'Weekly'
  },
  '2week': {
    label: '2',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B',
    chargedForEveryText: '2 weeks'
  },
  month: {
    label: '1',
    color: '#AB68BC',
    bg: '#FBF0FF',
    border: '#AC61BF2B',
    chargedForEveryText: 'month',
    accessText: 'Monthly'
  },
  '3months': {
    label: '3',
    color: '#6399E3',
    bg: '#EDF3FF',
    border: '#DAE4FD',
    chargedForEveryText: '3 months',
    accessText: 'Three months of a'
  },
  '6months': {
    label: '6',
    color: '#7172C9',
    bg: '#F0F0FF',
    border: '#6163CD2E',
    chargedForEveryText: '6 months',
    accessText: 'Six months of a'
  },
  year: {
    label: '12',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E',
    chargedForEveryText: 'year',
    accessText: 'Annual'
  },
  default: {
    label: 'S',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E'
  },
  // Season Pass
  '2weeks': {
    label: '2',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B',
    accessText: 'Two weeks of'
  },
  P: {
    label: 'P',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B'
  },
  // VOD rental - period in hours
  '48': {
    label: '2',
    color: '#D5749B',
    bg: '#FFF0FB',
    border: '#D980A42B',
    accessText: '2 days'
  },
  '72': {
    label: '3',
    color: '#AB68BC',
    bg: '#FBF0FF',
    border: '#AC61BF2B',
    accessText: '3 days'
  },
  '168': {
    label: '7',
    color: '#6399E3',
    bg: '#EDF3FF',
    border: '#DAE4FD',
    accessText: '7 days'
  },
  '720': {
    label: '1',
    color: '#7172C9',
    bg: '#F0F0FF',
    border: '#6163CD2E',
    accessText: 'Month'
  },
  '2160': {
    label: '3',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E',
    accessText: '3 months'
  },
  A: {
    label: 'A',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E'
  },
  E: {
    label: 'E',
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

export function dateFormat(timestamp, showTime = false) {
  const date = new Date(timestamp * 1000);
  const resultString = date.toLocaleDateString();
  if (showTime) {
    return `${resultString} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })}`;
  }
  return resultString;
}
