import { Suspense } from "react";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import BeianInfo from "../components/BeianInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habago | 哈巴狗",
  description: "面向AI的下一代开发框架",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="transition-colors">
      <body className={inter.className}>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
        <BeianInfo />
      </body>
    </html>
  );
}
