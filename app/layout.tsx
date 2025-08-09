
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Founder Brief',
  description: 'Your twice-daily founder interviews & AI breakthroughs digest.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
