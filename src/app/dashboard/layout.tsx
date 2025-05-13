import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ToastContainer } from 'react-toastify'

import DashboardHeader from './components/Header'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user?.email) {
    redirect('/')
  }

  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}
