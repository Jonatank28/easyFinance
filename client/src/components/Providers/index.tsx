'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "../ui/sonner"
import ClerkProviders from "./ClerkProvider"
import GetDataProviders from "./GetDataProviders"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
    >
      <Toaster />
      <ClerkProviders>
        <GetDataProviders>
          {children}
        </GetDataProviders>
      </ClerkProviders>
    </NextThemesProvider>
  )
}

export default Providers