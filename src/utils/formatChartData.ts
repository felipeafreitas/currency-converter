export const formatChartData = (timeseriesRate: unknown, currency: string) => {
  const timeseriesArray = [];
  const dates = [];

  for (const date in timeseriesRate?.rates) {
    dates.push(date);
    timeseriesArray.push(timeseriesRate?.rates[date][currency]);
  }

  return { timeseriesArray, dates };
};
