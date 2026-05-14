import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrototypePalette, PrototypePaletteProvider } from "@/components/shell";
import "./globals.css";

/* Inter Variable — `axes: ["opsz"]` enables the variable optical-size axis.
 * Omitting `weight` requests the full variable font (100-900) per next/font docs. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "baby-profound",
  description: "Sandbox for exploring product ideas against Profound.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="h-full">
        {/* Provider wraps the entire tree so the ⌘K shortcut works on every
            route, and Sidebar / any child can call `usePalette()` to toggle. */}
        <PrototypePaletteProvider>
          {children}
          <PrototypePalette />
        </PrototypePaletteProvider>
      </body>
    </html>
  );
}
