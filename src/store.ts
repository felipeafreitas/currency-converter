import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "./feature/converter/converterSlice";
import { countriesAPI } from "./services/countriesApi";

export const store = configureStore({
  reducer: {
    [countriesAPI.reducerPath]: countriesAPI.reducer,
    converter: converterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
