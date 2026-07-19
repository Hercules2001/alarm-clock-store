import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumina Alarm Clock - 50% OFF Limited Time",
  description: "Experience the premium Lumina Alarm Clock. Wake up refreshed. Order now for 50% OFF and fast shipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
