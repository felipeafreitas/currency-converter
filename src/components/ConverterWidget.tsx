import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import CountrySelect from "../components/CountrySelect";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AmountInput from "../components/AmountInput";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useGetCountriesQuery } from "../services/countriesApi";
import ThemeToggle from "./ThemeToggle";
import { Country } from "../models/country";
import { useGetLatestRateQuery } from "../services/exchangeRatesApi";
import { setRates } from "../feature/converter/converterSlice";

function ConverterWidget() {
  const { first, second } = useSelector((state: RootState) => state.converter);

  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useGetCountriesQuery();

  const filteredData = countriesData?.filter((country) => country.currencies);

  const { data: ratesData, isLoading: rateDataIsLoading } =
    useGetLatestRateQuery(first.currency);

  if (countriesDataIsLoading || rateDataIsLoading) return <CircularProgress />;

  return (
    <Card sx={{ minWidth: 600 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            Currency Converter
          </Typography>
          <ThemeToggle />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={8}>
            <AmountInput
              amount={first.amount}
              symbol={first.symbol}
              order="first"
            />
          </Grid>
          <Grid item xs={4}>
            <CountrySelect
              value={first.name}
              countries={filteredData as Country[]}
              currency={first.currency}
              order="first"
            />
          </Grid>
        </Grid>
        <Grid>
          <IconButton sx={{ ml: 1 }} color="inherit">
            <ImportExportIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={8}>
            <AmountInput
              amount={first.amount * ratesData.rates[second.currency]}
              symbol={second.symbol}
              order="second"
            />
          </Grid>
          <Grid item xs={4}>
            <CountrySelect
              value={second.name}
              countries={filteredData as Country[]}
              currency={second.currency}
              order="second"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConverterWidget;
