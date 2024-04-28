"use client";
import Header from "@/components/header";
import { UserStoreProvider } from "@/providers/userProvider";
import HydrationZustand from "@/providers/hydrationZustand";
import "@/styles/dashboard-globals.css";
import Footer from "@/components/footer";
import AuthStateLayout from "./auth-state-layout";
import Toastify from "@/components/ui/toast";

import "@/styles/globals.css";

// ----------------------------------------------------------------------

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserStoreProvider>
        <HydrationZustand>
          <AuthStateLayout>
            <Header />
            {children}
          </AuthStateLayout>
          <Toastify />
          <Footer />
        </HydrationZustand>
      </UserStoreProvider>
    </>
  );
}
