"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import { bgGradient } from "@/theme/css";
import { indigo, neutral } from "@/theme/colors";
import { Divider } from "@mui/material";
import SignInForm from "@/containers/app/sign-in-container/sign-in-form";

// ----------------------------------------------------------------------

export default function LoginContainer() {
  const theme = useTheme();

  const handleClick = () => {};

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: { xs: 2, md: 5 },
            width: 1,
            maxWidth: "fit-content",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              backgroundColor: `${neutral[800]}`,
              borderRadius: 2,
              p: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 52,
                color: "white",
                fontWeight: "bold",
              }}
            >
              carify.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Sign in to Dashboard.</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <SignInForm type="dashboard" />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
