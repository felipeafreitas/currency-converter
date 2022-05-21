import { Intervals } from "../core/intervals";

export const startDate = (interval: Intervals) => {
  const date = new Date();

  switch (interval) {
    case "1D":
      date.setDate(date.getDate() - 1);
      break;
    case "1M":
      date.setMonth(date.getMonth() - 1);
      break;
    case "1W":
      date.setDate(date.getDate() - 7);
      break;
    case "1Y":
      date.setFullYear(date.getFullYear() - 1);
      break;
    case "5Y":
      date.setFullYear(date.getFullYear() - 5);
      break;
  }
  return date;
};
