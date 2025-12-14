import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Explorer",
  description: "Discover real events powered by Ticketmaster API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
