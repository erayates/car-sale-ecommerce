"use client";
import Header from "@/components/header";
import { UserStoreProvider } from "@/providers/userProvider";
import HydrationZustand from "@/providers/hydrationZustand";
import "@/styles/dashboard-globals.css";
import Footer from "@/components/footer";
import AuthStateLayout from "./auth-state-layout";
import PageHero from "@/components/page-hero";
import AccountSidebar from "@/containers/app/account-container/account-sidebar";
import Toastify from "@/components/ui/toast";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserStoreProvider>
        <HydrationZustand>
          <Header />
          <PageHero title="Account" />
          <main className="container grid grid-cols-1 md:grid-cols-3 md:gap-16 space-y-16 md:space-y-0 relative my-16">
            <AccountSidebar />
            <AuthStateLayout>{children}</AuthStateLayout>
          </main>

          <Toastify />

          <Footer />
        </HydrationZustand>
      </UserStoreProvider>
    </>
  );
}
