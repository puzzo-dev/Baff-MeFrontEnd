
import { Layout } from "@/components/layout/Layout"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
