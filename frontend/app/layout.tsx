import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Watchlist',
  description: 'Movies and series I want to watch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}