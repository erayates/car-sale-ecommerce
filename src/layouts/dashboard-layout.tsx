"use client";

import { useState } from "react";

import Box from "@mui/material/Box";

import Nav from "@/components/dashboard/nav";
import Header from "@/components/dashboard/header";
import Main from "@/components/dashboard/main";
import { UserStoreProvider } from "@/providers/userProvider";
import HydrationZustand from "@/providers/hydrationZustand";
import "@/styles/dashboard-globals.css";
import Toastify from "@/components/ui/toast";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Toastify />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>
          <UserStoreProvider>
            <HydrationZustand>{children}</HydrationZustand>
          </UserStoreProvider>
        </Main>
      </Box>
    </>
  );
}
