
import "./globals.css";
import type { Metadata } from "next";


import { Montserrat, Inter, Space_Grotesk } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add what you need
  variable: '--font-montserrat', // Optional, for CSS variable usage
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "Positivus",
  description: "This is my Next.js app",
  icons: {
    icon: "/", // path relative to public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <title>Positivus</title>
      </head>
      <body
        className={`antialiased bg-[#FFFFFF] text-black dark ${spaceGrotesk.className}`}
      >
        {children}
      </body>
    </html>
  );
}

