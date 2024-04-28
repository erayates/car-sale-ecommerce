"use client";
import { CircularProgress } from "@mui/material";

export default function HydrationLoading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="text-[72px] font-semibold">carify.</h1>
      <CircularProgress />
    </div>
  );
}
