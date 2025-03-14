import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="zh-CN">
      <body
        className='antialiased'
      >
        {children}
      </body>
    </html>
  );
}
