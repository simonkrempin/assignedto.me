import './globals.css'

export const metadata = {
  title: 'AssignedToMe',
  description: 'Asign tasks to and get tasks from your peers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
