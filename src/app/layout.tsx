import type { Metadata } from "next";
import { Geist, Geist_Mono, Metrophobic } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const metrophobic = Metrophobic({
  weight: "400", // or other weights if available
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Application",
  description: "Chat Application to communicate with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" bbai-tooltip-injected="true">
      <body className={`${metrophobic.className} antialiased`}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
