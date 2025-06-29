const getDate = (date: number) => {
  const localDate = new Date(date * 1000);
  const year = localDate.getFullYear();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getTime = (date: number) => {
  const localDate = new Date(date * 1000);
  const hours = localDate.getHours().toString().padStart(2, '0');
  const minutes = localDate.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export { getDate, getTime };
