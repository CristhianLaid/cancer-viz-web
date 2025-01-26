import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/ui/globals.css"
import { Navbar } from "./(overview)/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - CancerViz",
  description: "Generated by create next app",
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
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
