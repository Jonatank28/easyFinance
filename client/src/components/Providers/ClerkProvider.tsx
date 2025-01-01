'use client'

import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes";
import { dark, experimental__simple } from "@clerk/themes"

const ClerkProviders = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple
      }}
      dynamic
    >
      {children}
    </ClerkProvider>
  )
}

export default ClerkProviders