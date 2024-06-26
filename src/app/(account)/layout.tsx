import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/theme";
import AccountLayout from "@/layouts/account-layout";

const roboto = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={roboto.className}>
          <AccountLayout>{children}</AccountLayout>
        </body>
      </ThemeProvider>
    </html>
  );
}
