'use client'
import {Provider} from 'react-redux'
import "./globals.css";
import { store } from './context/store';


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
        className= {`antialiased bg-[#F7F8F9]`}
      >
        <Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}

