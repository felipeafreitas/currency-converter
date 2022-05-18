import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "../models/country";

type LatestRates = {
  base: string;
  date: string;
  rates: { [key: string]: number };
  success: boolean;
};

type TimeSeriesParams = {
  currency: string;
  startDate: string;
  endDate: string;
};

export const exchangeRatesApi = createApi({
  reducerPath: "exchangeRatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exchangerate.host/" }),
  endpoints: (builder) => ({
    getLatestRate: builder.query<any, string>({
      query: (currency) => `/latest?base=${currency}`,
    }),
    getTimeseriesRate: builder.query<any, TimeSeriesParams>({
      query: ({ currency, startDate, endDate }) =>
        `/timeseries?base=${currency}&start_date=${startDate}&end_date=${endDate}`,
    }),
  }),
});

export const { useGetLatestRateQuery, useGetTimeseriesRateQuery } =
  exchangeRatesApi;
