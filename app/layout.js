"use client";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";
import GlobalProvider from "@/context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className="main-content">{children}</main>
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
