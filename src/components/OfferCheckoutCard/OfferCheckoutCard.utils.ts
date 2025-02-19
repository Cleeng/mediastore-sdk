export default (period: string) => {
  switch (period) {
    case 'week':
      return 'week';
    case 'month':
      return 'month';
    case '3months':
      return '3 months';
    case '6months':
      return '6 months';
    case 'year':
      return 'year';
    default:
      return '';
  }
};
