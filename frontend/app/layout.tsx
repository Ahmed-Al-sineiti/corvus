import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Corvus",
  description: "Premium Software Engineering Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen w-full overflow-x-hidden flex flex-col bg-background text-foreground"
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
