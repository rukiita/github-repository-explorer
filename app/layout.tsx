import Header from "@/components/header";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Repo Explorer",
  description: "Explore GitHub repositories with power and speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}
