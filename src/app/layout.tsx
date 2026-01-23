
import "./globals.css";
import type { Metadata } from "next";


import { Montserrat,Inter } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add what you need
  variable: '--font-montserrat', // Optional, for CSS variable usage
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300'], 
});

export const metadata: Metadata = {
  title: "ScaffoldGen",
  description: "This is my Next.js app",
  icons: {
    icon: "/", // path relative to public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en" className="">
      <head>
        <title>Slangster</title>
      </head>
      <body
        className= {`antialiased bg-[#000000] text-white dark ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}

