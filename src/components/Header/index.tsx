'use client'

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FiLoader, FiLogOut, FiUser } from 'react-icons/fi'
import { MdOutlineDashboard } from 'react-icons/md'

export default function Header() {
  const { data, status } = useSession()
  const handleLogin = async () => await signIn()
  const handleLogout = async () => await signOut()

  return (
    <header className="h-16 border-b border-zinc-600">
      <section className="max-w-7xl mx-auto flex justify-between items-center gap-4 p-4">
        <Link href={'/'}>
          <h2 className="font-bold text-xl">
            <span className="text-blue-500">Dev</span> Controle
          </h2>
        </Link>
        <div className="flex gap-4 text-2xl">
          {status === 'authenticated' ? (
            <>
              <p className="text-base text-zinc-400">
                <Link href={'/dashboard'}>
                  {data?.user.name?.split(' ')[0]}
                </Link>
              </p>
              <Link href={'/dashboard'} className="text-blue-400">
                <MdOutlineDashboard />
              </Link>
              <button
                type="button"
                className="text-red-400 cursor-pointer"
                onClick={handleLogout}
              >
                <FiLogOut />
              </button>
            </>
          ) : status === 'loading' ? (
            <button type="button" className="text-blue-500 animate-spin">
              <FiLoader />
            </button>
          ) : (
            <button
              type="button"
              className="text-blue-500 cursor-pointer"
              onClick={handleLogin}
            >
              <FiUser />
            </button>
          )}
        </div>
      </section>
    </header>
  )
}
