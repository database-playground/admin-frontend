import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@/providers/use-progress-provider";
import { PreloadResources } from "./preload-resources";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 管理介面 | 資料庫練功坊",
    default: "管理介面 | 資料庫練功坊",
  },
  description: "管理資料庫練功坊的題目、使用者、做題記錄等。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-hant-tw">
      <head>
        <PreloadResources />

        <link
          rel="stylesheet"
          href="https://assets.dbplay.app/ibm-plex-sans-tc/css/ibm-plex-sans-tc-default-swap.min.css"
        />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-sans antialiased
        `}
      >
        <ProgressProvider delay={500}>{children}</ProgressProvider>
        <Toaster />
      </body>
    </html>
  );
}
