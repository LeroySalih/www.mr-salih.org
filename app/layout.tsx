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
          <header className="w-full bg-white border-b">
            <div className="max-w-[1048px] mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <Link href="/" className="text-xl font-semibold text-slate-800">Mr. Salih</Link>
                  <div className="text-sm text-slate-500">Teaching & EdTech</div>
                </div>
              </div>

              <nav className="flex items-center gap-6">
                <Link href="/" className="text-slate-700 hover:text-green-700">Home</Link>
                <Link href="/blog" className="text-slate-700 hover:text-green-700">Blog</Link>
                <Link href="/about" className="text-slate-700 hover:text-green-700">About</Link>
                <Link href="/contact" className="text-slate-700 hover:text-green-700">Contact</Link>
              </nav>
            </div>
          </header>

          <main className="max-w-[1048px] mx-auto px-4 mt-10 pb-16">
            <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
          </main>

          <footer className="w-full mt-12 border-t">
            <div className="max-w-[1048px] mx-auto px-4 py-6 text-sm text-slate-600 flex justify-between items-center">
              <div>© {new Date().getFullYear()} Mr. Salih — Teaching & EdTech</div>
              <div className="text-slate-500">Built with care for teachers</div>
            </div>
          </footer>
      </body>
    </html>
  );
}
