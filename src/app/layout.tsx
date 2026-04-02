import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Libre_Franklin,
  JetBrains_Mono,
} from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen Command Center",
  description:
    "Strategic command center for Substack newsletter management — capture insights, research topics, draft essays, and grow your audience with AI-powered workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${libreFranklin.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
