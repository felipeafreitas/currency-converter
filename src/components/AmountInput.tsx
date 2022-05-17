import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAmount } from "../feature/converter/converterSlice";

type AmountInput = {
  amount: number;
  symbol: string;
  order: "first" | "second";
};

function AmountInput({ amount, symbol, order }: AmountInput) {
  const dispatch = useDispatch();

  const onChange = (e) =>
    dispatch(
      setAmount({
        order: order,
        amount: e.target.value,
      })
    );

  return (
    <OutlinedInput
      startAdornment={
        <InputAdornment position="start">{symbol}</InputAdornment>
      }
      fullWidth
      value={amount}
      onChange={onChange}
    />
  );
}

export default AmountInput;
