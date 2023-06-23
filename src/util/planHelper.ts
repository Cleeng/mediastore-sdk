const period = [
  'day',
  'week',
  'month',
  'year',
  'P',
  'A',
  'E',
  'default',
  'weekly',
  '2week',
  'monthly',
  '3months',
  '3-months',
  '6months',
  '6-months',
  'annual',
  '2weeks',
  '48',
  '72',
  '168',
  '720',
  '2160',
  'seasonal',
  'season'
] as const;

export type SubscriptionPeriodType =
  | '3months'
  | '6months'
  | 'month'
  | 'week'
  | 'year';

export type Period = typeof period[number];

export const isPeriod = (s: string): s is Period => {
  return period.some(p => p === s);
};

export const periodMapper: Record<
  Period,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    chargedForEveryText?: string;
    accessText?: string;
  }
> = {
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
  weekly: {
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
  monthly: {
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
  '3-months': {
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
  '6-months': {
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
  annual: {
    label: '12',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E',
    chargedForEveryText: 'year',
    accessText: 'Annual'
  },
  season: {
    label: 'S',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E',
    chargedForEveryText: 'season',
    accessText: 'Season'
  },
  seasonal: {
    label: 'S',
    color: '#5971B9',
    bg: '#EDF1FF',
    border: '#39529B2E',
    chargedForEveryText: 'season',
    accessText: 'Season'
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

export type CurrencyFormat =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'AUD'
  | '€'
  | '$'
  | '£'
  | 'DKK'
  | 'CAD'
  | 'CHF'
  | 'NOK'
  | 'NZD'
  | 'SEK'
  | 'TRY'
  | 'XOF'
  | 'ZAR'
  | 'NGN'
  | 'KES'
  | 'GHS'
  | 'MXN'
  | 'KRW'
  | 'XAF'
  | 'JPY'
  | 'PHP'
  | 'VND'
  | 'BRL'
  | 'INR'
  | 'MNT'
  | 'EGP'
  | 'QAR'
  | 'KWD'
  | 'AED';

export const currencyFormat: Record<CurrencyFormat, string> = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  DKK: 'kr.',
  CAD: 'C$',
  CHF: 'CHF',
  NOK: 'kr',
  NZD: 'NZ$',
  SEK: 'kr',
  TRY: '₺',
  XOF: 'CFA',
  ZAR: 'R',
  NGN: '₦',
  KES: 'Ksh',
  GHS: 'GH¢',
  MXN: 'Mex$',
  KRW: '₩',
  XAF: 'FCFA',
  JPY: '¥',
  PHP: '₱',
  VND: '₫',
  BRL: 'R$',
  INR: '₹',
  MNT: '₮',
  EGP: 'E£',
  QAR: 'QR',
  KWD: 'KD',
  AED: 'د.إ',
  '€': '€',
  $: '$',
  '£': '£'
};

export function dateFormat(timestamp: number, showTime = false) {
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

export const INFINITE_DATE = 2145913200;
