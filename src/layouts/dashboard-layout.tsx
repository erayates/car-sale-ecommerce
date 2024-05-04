"use client";

import { useState } from "react";

import Box from "@mui/material/Box";

import Nav from "@/components/dashboard/nav";
import Header from "@/components/dashboard/header";
import Main from "@/components/dashboard/main";
import { UserStoreProvider, useUserStore } from "@/providers/userProvider";
import HydrationZustand from "@/providers/hydrationZustand";
import "@/styles/dashboard-globals.css";
import Toastify from "@/components/ui/toast";
import AuthStateLayout from "./auth-state-layout";
import { UserType } from "@/types/user";

// ----------------------------------------------------------------------

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <UserStoreProvider>
        <HydrationZustand>
          <AuthStateLayout>
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

              <Main>{children}</Main>
            </Box>
          </AuthStateLayout>
        </HydrationZustand>
      </UserStoreProvider>
    </>
  );
}
