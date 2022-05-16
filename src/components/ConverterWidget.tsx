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

function ConverterWidget() {
  const { first, second } = useSelector((state: RootState) => state.converter);

  const { data, isLoading } = useGetCountriesQuery();

  const filteredData = data?.filter((country) => country.currencies);

  if (isLoading) return <CircularProgress />;

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
        >
          <AmountInput amount={first.amount} symbol={first.currency} />
          <CountrySelect
            value={first.name}
            countries={filteredData as Country[]}
            currency={first.currency}
            order="first"
          />
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
        >
          <AmountInput amount={second.amount} symbol={second.currency} />{" "}
          <CountrySelect
            value={second.name}
            countries={filteredData as Country[]}
            currency={second.currency}
            order="second"
          />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConverterWidget;
