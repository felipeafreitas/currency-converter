import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
} from "@mui/material";
import { ChartData } from "chart.js";
import { Intervals } from "../core/intervals";

import "chart.js/auto";

import { Chart } from "react-chartjs-2";

type RateChart = {
  interval: Intervals;
  setInterval: any;
  timeseriesRateIsFetching: boolean;
  chartData: ChartData;
};

function RateChart({
  interval,
  setInterval,
  timeseriesRateIsFetching,
  chartData,
}: RateChart) {
  const timeButtons: Intervals[] = ["1D", "1W", "1M", "1Y", "5Y"];

  return (
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
  );
}

export default RateChart;
