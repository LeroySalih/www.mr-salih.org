import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
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

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
      >
          <header className="w-full bg-slate-200 border-b">
            <div className="max-w-[1048px] mx-auto px-4 p-4 flex justify-between items-center">
              <div>Top Header</div>
              <div>
                <Link href="/blog">Blog</Link>
              </div>
            </div>
          </header>

          <main className="max-w-[1048px] mx-auto px-4 mt-8 bg-slate-100">
            {children}
          </main>
      </body>
    </html>
  );
}
