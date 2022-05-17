import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "../models/country";

type LatestRates = {
  base: string;
  date: string;
  rates: { [key: string]: number };
  success: boolean;
};

export const exchangeRatesApi = createApi({
  reducerPath: "exchangeRatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exchangerate.host/" }),
  endpoints: (builder) => ({
    getLatestRate: builder.query<any, string>({
      query: (currency) => `/latest?base=${currency}`,
    }),
  }),
});

export const { useGetLatestRateQuery } = exchangeRatesApi;
