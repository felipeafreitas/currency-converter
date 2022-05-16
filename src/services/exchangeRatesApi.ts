import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "../models/country";

export const countriesAPI = createApi({
  reducerPath: "exchangeRatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exchangerate.host/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => "/all",
    }),
  }),
});

export const { useGetCountriesQuery } = countriesAPI;
