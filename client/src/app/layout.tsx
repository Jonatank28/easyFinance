import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";
import ClerkProviderTheme from "@/components/Providers/ClerkProviderTheme";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin-ext"],
});


export const metadata: Metadata = {
  title: "Easy Finance",
  description: "Easy Finance",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning cz-shortcut-listen="true">
      <body className={`${mulish.variable} font-sans antialiased`}>
        <Providers>
          <ClerkProviderTheme>
            <main>
              {children}
            </main>
          </ClerkProviderTheme>
        </Providers>
      </body>
    </html>
  );
}
