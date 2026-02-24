// get todays date
export const GetTodaysDate = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day.toString().length < 2) {
    day = "0" + day;
  }
  if (month.toString().length < 2) {
    month = "0" + month;
  }

  let dateString = year + "-" + month + "-" + day;
  let dateObject = {
    year,
    month,
    day,
  };
  return { dateString, dateObject };
};

export const GetCustomDate = (date) => {
  let today = new Date(date);
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day.toString().length < 2) {
    day = "0" + day;
  }
  if (month.toString().length < 2) {
    month = "0" + month;
  }

  let dateString = day + "-" + month + "-" + year;

  return dateString;
};
