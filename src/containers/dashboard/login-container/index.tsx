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

// ----------------------------------------------------------------------

export default function LoginContainer() {
  const theme = useTheme();

  const handleClick = () => {};

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" sx={{ fontSize: 14 }} />

        <TextField name="password" label="Password" type="password" />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: "fit-content",
            display: "flex",
            gap: 8,
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
          <Box>{renderForm}</Box>
        </Card>
      </Stack>
    </Box>
  );
}
