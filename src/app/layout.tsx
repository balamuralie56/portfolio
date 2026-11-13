import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import SiteBackdrop from "../components/SiteBackdrop";

export const metadata: Metadata = {
  title: "Balamurali E | Jr. Full-Stack AI Developer",
  description: "Portfolio of Balamurali E, Jr. Full-Stack AI Developer specializing in Machine Learning, Deep Learning, and Computer Vision.",
  keywords: [
    "Balamurali E",
    "Jr. Full-Stack AI Developer",
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
    "YOLOv11",
    "Next.js Portfolio"
  ],
  authors: [{ name: "Balamurali E" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <SiteBackdrop />
          <div className="relative">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
