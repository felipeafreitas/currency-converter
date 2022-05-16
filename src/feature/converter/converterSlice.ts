import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../models/country";

type SelectedCountry = {
  amount: number;
  currency: string;
  symbol: string;
  name: string;
};

export interface CounterState {
  first: SelectedCountry;
  second: SelectedCountry;
}

const initialState: CounterState = {
  first: {
    name: "",
    amount: 0,
    currency: "",
    symbol: "",
  },
  second: {
    name: "",
    amount: 0,
    currency: "",
    symbol: "",
  },
};

type SetAmount = {
  order: "first" | "second";
  amount: number;
};

type SetCurrency = {
  order: "first" | "second";
  country: Country;
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<SetAmount>) => {
      state[action.payload.order].amount = action.payload.amount;
    },
    setCurrency: (state, action: PayloadAction<SetCurrency>) => {
      state[action.payload.order].currency = action.payload.country.currencies;
      state[action.payload.order].symbol = action.payload.country.;
      state[action.payload.order].name = action.payload.country.name;
    },
    switchValues: (state) => {
      [state.first, state.second] = [state.second, state.first];
    },
  },
});

export const { setAmount, setCurrency, switchValues } = counterSlice.actions;

export default counterSlice.reducer;
