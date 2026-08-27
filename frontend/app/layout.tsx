import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, VT323 } from "next/font/google";
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

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "Corvus",
  description: "Premium Software Engineering Studio",
  icons: {
    icon: [{ url: "/corvus.svg", type: "image/svg", sizes: "512x512" }],
  },
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${vt323.variable} antialiased`}
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
