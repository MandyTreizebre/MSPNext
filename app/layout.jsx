'use client'
import { makeStore } from "@/slices/store" 
import "./globals.css" 
import Header from "@/components/Header" 
import Footer from "@/components/Footer" 
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/slices/store'
import { useRef } from "react" 
import DarkMode from "@/components/DarkMode" 

export default function RootLayout({ children }) {
  const storeRef = useRef()
  if(!storeRef.current){
    storeRef.current = makeStore()
  }
  return (
    <html lang="fr">
      <body>
        <Provider store={storeRef.current}>
          <PersistGate loading={null} persistor={persistor}>
            <DarkMode />
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  ) 
}
