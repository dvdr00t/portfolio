import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Davide Arcolini | Consultant & Developer",
  description: "Portfolio of Davide Arcolini, Consultant at Liquid Reply specializing in LLM integration and application modernization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          inter.variable,
          outfit.variable,
          "antialiased bg-slate-950 text-slate-200"
        )}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
