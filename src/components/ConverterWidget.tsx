import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
  Box,
} from "@mui/material";
import "chart.js/auto";

import { Chart } from "react-chartjs-2";

import CountrySelect from "../components/CountrySelect";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AmountInput from "../components/AmountInput";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useGetCountriesQuery } from "../services/countriesApi";
import ThemeToggle from "./ThemeToggle";
import { Country } from "../models/country";
import {
  useGetLatestRateQuery,
  useGetTimeseriesRateQuery,
} from "../services/exchangeRatesApi";
import { useEffect, useState } from "react";
import { convertDate } from "../utils/convertDate";
import { Intervals } from "../core/intervals";
import { startDate } from "../utils/startDate";
import { formatChartData } from "../utils/formatChartData";
import { switchValues } from "../feature/converter/converterSlice";

const timeButtons: Intervals[] = ["1D", "1W", "1M", "1Y", "5Y"];

function ConverterWidget() {
  const [interval, setInterval] = useState<Intervals>("1Y");
  const [chartData, setChartData] = useState({});
  const { first, second } = useSelector((state: RootState) => state.converter);
  const dispatch = useDispatch();

  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useGetCountriesQuery();

  const filteredData = countriesData?.filter((country) => country.currencies);

  const {
    data: ratesData,
    isLoading: rateDataIsLoading,
    isFetching: ratesDataIsFetching,
  } = useGetLatestRateQuery(first.currency);

  const endDate = new Date();

  const {
    data: timeseriesRate,
    isLoading: timeseriesRateIsLoading,
    isFetching: timeseriesRateIsFetching,
  } = useGetTimeseriesRateQuery({
    currency: first.currency,
    startDate: convertDate(startDate(interval)),
    endDate: convertDate(endDate),
  });

  useEffect(() => {
    if (timeseriesRate?.success) {
      const { timeseriesArray, dates } = formatChartData(
        timeseriesRate,
        second.currency
      );
      setChartData({
        labels: dates,
        datasets: [
          {
            data: timeseriesArray,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [timeseriesRate, second]);

  if (countriesDataIsLoading || rateDataIsLoading || timeseriesRateIsLoading)
    return <CircularProgress />;

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
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={() => dispatch(switchValues())}
          >
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
              amount={
                ratesDataIsFetching
                  ? "..."
                  : first.amount * ratesData?.rates[second.currency]
              }
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
        <Grid sx={{ mt: 5 }}>
          <ButtonGroup variant="outlined" fullWidth color="info">
            {timeButtons.map((value) => (
              <Button
                key={value}
                variant={value === interval ? "contained" : "outlined"}
                onClick={() => setInterval(value)}
              >
                {value}
              </Button>
            ))}
          </ButtonGroup>
          {timeseriesRateIsFetching ? (
            <Box
              sx={{
                width: 568,
                height: 284,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Chart
              type="line"
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                scales: {
                  xAxis: {
                    display: false,
                  },
                  yAxis: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConverterWidget;
