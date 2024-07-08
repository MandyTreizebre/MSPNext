'use client'
import { makeStore } from "@/slices/store";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { useRef } from "react";
import DarkMode from "@/components/DarkMode";

export default function RootLayout({ children }) {
  const storeRef = useRef()
  if(!storeRef.current){
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      <DarkMode />
      <html lang="fr">
        <body>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
