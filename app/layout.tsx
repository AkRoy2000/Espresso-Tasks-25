import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import GlobalStylesProvider from "./providers/GlobalStylesProvider";
import Sidebar from "./components/Sidebar/Sidebar";
import ContextProvider from "./providers/ContextProvider";
import { ClerkProvider } from '@clerk/nextjs';
import NextTopLoader from "nextjs-toploader";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
   subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Espresso Tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider>
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" 
      crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={openSans.className}>
        <NextTopLoader 
        height={4}
        color="#bb00ff"
        easing="cubic-bezier(0.53,0.21,0,1)"
        showSpinner={false}
        />
        <ContextProvider>
            <GlobalStylesProvider>
             <div className='w-full'>{children}</div>
             <Sidebar />
            </GlobalStylesProvider>
         </ContextProvider>
         
        </body>
    </html>
    </ClerkProvider>
  );
}
