const timeZoneOffset = new Date().getTimezoneOffset() * 60000;

const getDate = (date: number) =>
  new Date(date * 1000 - timeZoneOffset).toISOString().split('T')[0];

const getTime = (date: number) =>
  new Date(date * 1000 - timeZoneOffset)
    .toISOString()
    .split('T')[1]
    .substring(0, 5);

export { getDate, getTime };
