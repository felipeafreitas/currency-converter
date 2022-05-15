import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  firstValue: {
    amount: number;
    currency: string;
  };
  secondValue: {
    amount: number;
    currency: string;
  };
}

const initialState: CounterState = {
  firstValue: {
    amount: 0,
    currency: "",
  },
  secondValue: {
    amount: 0,
    currency: "",
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAmount: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    setCurrency: (state) => {
      return;
    },
    switchValues: (state) => {
      return;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAmount, setCurrency, switchValues } = counterSlice.actions;

export default counterSlice.reducer;
