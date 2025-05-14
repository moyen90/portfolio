import type { Metadata } from 'next'
import './globals.css'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'Moyenul Islam',
  description: 'Backend Developer',
  generator: 'Moyenul Islam',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
