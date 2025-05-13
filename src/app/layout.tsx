import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/providers/auth'
import Header from '@/components/Header'
import { ModalProvider } from '@/providers/modal'
import { ToastContainer } from 'react-toastify'
import Footer from '@/components/Footer'

const roboto = Roboto({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dev Controle',
  description:
    'Gerencie seus clientes de forma simples e eficiente com o Dev Controle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <ModalProvider>
            <ToastContainer theme="dark" autoClose={1500} />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
