import { Inter } from "next/font/google";

import './globals.css'

export const metadata = {
  title: 'AssignedToMe',
  description: 'Asign tasks to and get tasks from your peers',
}

const fontFace = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={fontFace.className}>{children}</body>
    </html>
  )
}
