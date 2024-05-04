import ThemeProvider from "@/theme";
import DashboardLayout from "@/layouts/dashboard-layout";
import { isUserAdmin } from "@/lib/firebase/firebase-admin";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <DashboardLayout>{children}</DashboardLayout>
        </body>
      </ThemeProvider>
    </html>
  );
}
