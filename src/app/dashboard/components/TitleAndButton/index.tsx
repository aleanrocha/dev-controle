'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

interface TitleAndButtonProps {
  title: string
  url: string
  btnText: string
  isDashboard?: boolean
}

export default function TitleAndButton({
  title,
  url,
  btnText,
  isDashboard,
}: TitleAndButtonProps) {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center gap-4 mb-8">
      <h1 className="font-bold text-lg sm:text-xl">{title}</h1>
      {isDashboard && (
        <FiRefreshCcw
          className="sm:text-xl cursor-pointer font-extrabold hover:text-blue-400 transition hover:animate-spin"
          onClick={() => router.refresh()}
        />
      )}
      <Link href={url} className="btn">
        {btnText}
      </Link>
    </div>
  )
}
