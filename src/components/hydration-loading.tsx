"use client";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function HydrationLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: "700", fontSize: "72px" }}>
        carify.
      </Typography>
      <CircularProgress />
    </Box>
  );
}
