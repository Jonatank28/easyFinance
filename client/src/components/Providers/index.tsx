'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}

export default Providers