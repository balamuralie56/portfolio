import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Balamurali E | Deep Learning & Full-Stack AI Engineer Portfolio",
  description: "Cinematic, immersive 3D portfolio of Balamurali E, Deep Learning Engineer, Technical Lead, and Full-Stack AI Developer specializing in Computer Vision, Edge AI, and YOLO deployments.",
  keywords: [
    "Balamurali E",
    "Deep Learning Engineer",
    "Computer Vision Engineer",
    "Technical Lead",
    "Full-Stack AI Developer",
    "YOLOv11",
    "NVIDIA Jetson Orin",
    "Three.js Portfolio",
    "Next.js Portfolio",
    "React Three Fiber"
  ],
  authors: [{ name: "Balamurali E" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scrollbar-none antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col scrollbar-none select-none">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
