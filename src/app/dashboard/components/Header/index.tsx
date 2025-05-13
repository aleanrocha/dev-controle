import Container from '@/components/Container'
import Link from 'next/link'

export default function DashboardHeader() {
  return (
    <Container>
      <header className="bg-zinc-800 p-4 mt-4">
        <nav className="flex items-center gap-4">
          <Link
            href={'/dashboard'}
            className="font-bold hover:text-blue-400 transition"
          >
            Chamados
          </Link>
          <Link
            href={'/dashboard/customer'}
            className="font-bold hover:text-blue-400 transition"
          >
            Clientes
          </Link>
        </nav>
      </header>
    </Container>
  )
}
