import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

import Container from '@/components/Container'
import TitleAndButton from './components/TitleAndButton'
import { TicketItemDesktop, TicketItemMobile } from './components/TicketItem'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const tickets = await prismaClient.ticket.findMany({
    where: { customer: { userId: session?.user.id }, status: 'ABERTO' },
    include: { customer: true },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <Container>
      <main>
        <TitleAndButton
          title="Meus Chamados"
          url="/dashboard/ticket/new"
          btnText="Novo"
          isDashboard
        />
        <section className=" w-full">
          {tickets.length > 0 ? (
            <>
              <div className="sm:hidden flex flex-col gap-4">
                <TicketItemMobile tickets={tickets} />
              </div>
              <div className="hidden sm:block">
                <TicketItemDesktop tickets={tickets} />
              </div>
            </>
          ) : (
            <p className="text-zinc-400 font-bold text-center pt-8">
              Nenhum chamado em aberto.
            </p>
          )}
        </section>
      </main>
    </Container>
  )
}
