import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";

import CountrySelect from "../components/CountrySelect";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AmountInput from "../components/AmountInput";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useGetCountriesQuery } from "../services/countriesApi";
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
import { ChartData } from "chart.js/auto";
import RateChart from "./RateChart";
import Header from "./Header";

function ConverterWidget() {
  const [interval, setInterval] = useState<Intervals>("1Y");
  const [chartData, setChartData] = useState<ChartData>({} as ChartData);
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
        <Header />
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
        <RateChart
          chartData={chartData}
          interval={interval}
          setInterval={setInterval}
          timeseriesRateIsFetching={timeseriesRateIsFetching}
        />
      </CardContent>
    </Card>
  );
}

export default ConverterWidget;
