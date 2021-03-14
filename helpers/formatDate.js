const formatDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date
    .toLocaleTimeString()
    .replace(':', '-')
    .replace(':', '-');

  const formattedDatetime = `${formattedDate}_${formattedTime}`;

  return formattedDatetime;
};

module.exports = formatDate;
