import ThemeProvider from "@/theme";

export const metadata = {
  title: "carify. Administrator",
  description: "carify. | Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
