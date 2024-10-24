import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Redirector</h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Redirectors
          </Link>
          <Link
            href="/profile"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Settings
          </Link>
        </nav>
      </div>
      {children}
      <Toaster />
    </div>
  )
}
