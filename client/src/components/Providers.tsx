'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import ThemeToggle from "./ThemeToggle"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
    >
      {children}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </NextThemesProvider>
  )
}

export default Providers