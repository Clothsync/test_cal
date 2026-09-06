import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloth.sync | Cost Calculator",
  description: "China to India garment import cost calculator"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
