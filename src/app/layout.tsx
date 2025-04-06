
import { Providers } from "@/components/providers"
import { Layout } from "@/components/layout/Layout"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BAFF-ME",
  description: "Urban fashion and streetwear for the bold",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
