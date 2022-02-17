export default (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};