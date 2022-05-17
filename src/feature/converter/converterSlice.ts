import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../models/country";

type SelectedCountry = {
  amount: number;
  currency: string;
  symbol: string;
  name: string;
};

export interface ConverterState {
  first: SelectedCountry;
  second: SelectedCountry;
  rates: {
    [key: string]: number;
  };
}

const initialState: ConverterState = {
  rates: {},
  first: {
    name: "Brazil",
    amount: 1,
    currency: "BRL",
    symbol: "R$",
  },
  second: {
    name: "United States",
    amount: 1,
    currency: "USD",
    symbol: "$",
  },
};

type SetAmount = {
  order: "first" | "second";
} & Pick<SelectedCountry, "amount">;

type SetCurrency = {
  order: "first" | "second";
} & Omit<SelectedCountry, "amount">;

type SetRates = {
  rates: {
    [key: string]: number;
  };
};

export const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<SetAmount>) => {
      state[action.payload.order].amount = action.payload.amount;
    },
    setCurrency: (state, action: PayloadAction<SetCurrency>) => {
      state[action.payload.order].currency = action.payload.currency;
      state[action.payload.order].symbol = action.payload.symbol;
      state[action.payload.order].name = action.payload.name;
    },
    switchValues: (state) => {
      [state.first, state.second] = [state.second, state.first];
    },
    setRates: (state, action: PayloadAction<SetRates>) => {
      state.rates = action.payload.rates;
    },
  },
});

export const { setAmount, setCurrency, switchValues, setRates } =
  converterSlice.actions;

export default converterSlice.reducer;
