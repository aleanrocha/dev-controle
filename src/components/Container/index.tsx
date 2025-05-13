import { ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-7xl m-auto p-4">{children}</div>
}
