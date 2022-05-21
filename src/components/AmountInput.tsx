import { InputAdornment, OutlinedInput } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAmount } from "../feature/converter/converterSlice";

type AmountInput = {
  amount: number | string;
  symbol: string;
  order: "first" | "second";
};

function AmountInput({ amount, symbol, order }: AmountInput) {
  const dispatch = useDispatch();

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    dispatch(
      setAmount({
        order: order,
        amount: parseInt(e.target.value.replace(/[^0-9.]/g, ""), 10),
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
