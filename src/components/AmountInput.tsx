import { InputAdornment, OutlinedInput } from "@mui/material";

type AmountInput = {
  amount: number;
  symbol: string;
};

function AmountInput({ amount, symbol }: AmountInput) {
  return (
    <OutlinedInput
      startAdornment={
        <InputAdornment position="start">{symbol}</InputAdornment>
      }
      value={amount}
    />
  );
}

export default AmountInput;
