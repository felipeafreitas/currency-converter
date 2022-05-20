import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import "chart.js/auto";

import { Bar, Chart } from "react-chartjs-2";

import CountrySelect from "../components/CountrySelect";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AmountInput from "../components/AmountInput";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useGetCountriesQuery } from "../services/countriesApi";
import ThemeToggle from "./ThemeToggle";
import { Country } from "../models/country";
import {
  useGetLatestRateQuery,
  useGetTimeseriesRateQuery,
} from "../services/exchangeRatesApi";
import { setRates } from "../feature/converter/converterSlice";
import { useEffect, useState } from "react";
import { ChartData } from "chart.js";

type Interval = "1D" | "1W" | "1M" | "1Y" | "5Y";

function ConverterWidget() {
  const [interval, setInterval] = useState<Interval>("1Y");
  const [chartData, setChartData] = useState({});
  const { first, second } = useSelector((state: RootState) => state.converter);

  const { data: countriesData, isLoading: countriesDataIsLoading } =
    useGetCountriesQuery();

  const filteredData = countriesData?.filter((country) => country.currencies);

  const { data: ratesData, isLoading: rateDataIsLoading } =
    useGetLatestRateQuery(first.currency);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const convertDate = (date: Date) => date.toISOString().split("T")[0];

  const { data: timeseriesRate, isLoading: timeseriesRateIsLoading } =
    useGetTimeseriesRateQuery({
      currency: first.currency,
      startDate: convertDate(startDate),
      endDate: convertDate(endDate),
    });

  useEffect(() => {
    if (timeseriesRate) {
      const timeseriesArray = [];
      const dates = [];
      for (const date in timeseriesRate.rates) {
        dates.push(date);
        timeseriesArray.push(timeseriesRate.rates[date][second.currency]);
      }
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
  }, [timeseriesRate]);

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
        <Grid sx={{ mt: 5 }}>
          <ButtonGroup variant="outlined" fullWidth color="info">
            <Button onClick={() => setInterval("1D")}>1D</Button>
            <Button onClick={() => setInterval("1W")}>1W</Button>
            <Button onClick={() => setInterval("1M")}>1M</Button>
            <Button onClick={() => setInterval("1Y")}>1Y</Button>
            <Button onClick={() => setInterval("5Y")}>5Y</Button>
          </ButtonGroup>
          {chartData && (
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
