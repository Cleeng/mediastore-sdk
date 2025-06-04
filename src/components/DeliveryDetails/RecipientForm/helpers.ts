const getDate = (date: number): string => {
  const localDate = new Date(date * 1000);
  const year = localDate.getFullYear();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const getTime = (date: number) =>
  new Date(date * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

export { getDate, getTime };
