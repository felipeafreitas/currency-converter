import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "./feature/converter/converterSlice";
import { countriesAPI } from "./services/countriesApi";
import { exchangeRatesApi } from "./services/exchangeRatesApi";

export const store = configureStore({
  reducer: {
    [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
    [countriesAPI.reducerPath]: countriesAPI.reducer,
    converter: converterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesAPI.middleware)
      .concat(exchangeRatesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
