import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mr-salih.org",
  description: "Support web site for mr-salih.org activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="p-4 border-b mb-8 flex justify-between bg-slate-200 flex-row">
          <div>Top Header</div>
          <div><Link href="/blog">Blog</Link></div>
        </div>
          <div>
            {children}
          </div>
      </body>
    </html>
  );
}
