"use client";

import { UserStoreProvider } from "@/providers/userProvider";
import HydrationZustand from "@/providers/hydrationZustand";
import "@/styles/dashboard-globals.css";
import Toastify from "@/components/ui/toast";
import AuthStateLayout from "./auth-state-layout";
import { Box } from "@mui/material";

export default function DashboardLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserStoreProvider>
        <HydrationZustand>
          <AuthStateLayout>
            <Toastify />
            <Box
              sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {children}
            </Box>
          </AuthStateLayout>
        </HydrationZustand>
      </UserStoreProvider>
    </>
  );
}
