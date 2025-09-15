import type { Metadata } from "next";
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "BookVerse - Dive into Your Next Adventure",
  description:
    "Explore a world of stories waiting to be told. Discover your next favorite book with our comprehensive library.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` font-sans ${workSans.variable} ${openSans.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Toaster richColors position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
