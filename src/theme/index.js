"use client";
import { createTheme } from "@mui/material";
import { createPalette } from "./create-palette";
import { createComponents } from "./create-components";
import { createShadows } from "./create-shadows";
import { createTypography } from "./create-typograhy";

import { ThemeProvider } from "@emotion/react";

const palette = createPalette();
const components = createComponents({ palette });
const shadows = createShadows();
const typography = createTypography();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components,
  palette,
  shadows,
  shape: {
    borderRadius: 8,
  },
  typography,
});

export default function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
