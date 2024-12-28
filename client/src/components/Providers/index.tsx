'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "../ui/sonner"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
    >
      <Toaster />
      {children}
    </NextThemesProvider>
  )
}

export default Providers