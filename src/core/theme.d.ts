import { Theme as MuiTheme } from "@mui/material/styles";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    palette: {
      mode: string;
    };
  }
}
