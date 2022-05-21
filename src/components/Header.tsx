import { Grid, Typography } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
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
  );
}

export default Header;
