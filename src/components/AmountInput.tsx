import {
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function AmountInput() {
  const [currency, setCurrency] = useState("EUR");

  return (
    <OutlinedInput
      id="outlined-adornment-amount"
      startAdornment={<InputAdornment position="start">$</InputAdornment>}
      label="Amount"
    />
  );
}

export default AmountInput;
