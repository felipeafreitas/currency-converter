import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";

import CountrySelect from "../components/CountrySelect";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AmountInput from "../components/AmountInput";

function ConverterWidget() {
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
          {/* <ThemeToggle /> */}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <AmountInput />
          <CountrySelect />
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
          <AmountInput />
          <CountrySelect />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ConverterWidget;
