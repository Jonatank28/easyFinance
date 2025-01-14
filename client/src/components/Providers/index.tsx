'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "../ui/sonner"
import ClerkProviders from "./ClerkProvider"
import GetDataProviders from "./GetDataProviders"
import { Suspense } from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
    >
      <Toaster />
      <ClerkProviders>
        <Suspense>
          <GetDataProviders>
            {children}
          </GetDataProviders>
        </Suspense>
      </ClerkProviders>
    </NextThemesProvider>
  )
}

export default Providers