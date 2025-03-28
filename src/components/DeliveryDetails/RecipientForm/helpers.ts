const getLocalDate = (timestamp: number) => {
  const d = new Date(timestamp * 1000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getLocalTime = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleTimeString();

export { getLocalDate, getLocalTime };
