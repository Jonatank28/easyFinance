import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Easy Finance",
  description: "Easy Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${mulish.variable} font-sans antialiased`}>
          <Providers>
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
