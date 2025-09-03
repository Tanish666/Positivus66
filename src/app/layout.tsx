'use client'
import {Provider} from 'react-redux'
import "./globals.css";
import { store } from './context/store';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add what you need
  variable: '--font-montserrat', // Optional, for CSS variable usage
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en" className="">
      <head>
        <title>rough work</title>
      </head>
      <body
        className= {`${montserrat.className} antialiased bg-zinc-950 text-white`}
      >
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}

