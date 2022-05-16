import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country } from "../models/country";

export const countriesAPI = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => "/all",
    }),
  }),
});

export const { useGetCountriesQuery } = countriesAPI;
