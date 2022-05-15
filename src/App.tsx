import {
  createTheme,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { createContext, useMemo, useState } from "react";

import ConverterWidget from "./components/ConverterWidget";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
          sx={{
            bgcolor: "background.default",
          }}
        >
          <ConverterWidget />
        </Grid>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
