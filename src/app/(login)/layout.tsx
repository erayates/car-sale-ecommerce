import DashboardLoginLayout from "@/layouts/dashboard-login-layout";
import ThemeProvider from "@/theme";

import "@/styles/globals.css";
import { Public_Sans } from "next/font/google";

const pSans = Public_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "carify. Administrator",
  description: "carify. | Admin Dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={pSans.className}>
          <DashboardLoginLayout>{children}</DashboardLoginLayout>
        </body>
      </html>
    </ThemeProvider>
  );
}
