import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

import Container from '@/components/Container'
import CardCustomer from './components/CardCustumer'
import TitleAndButton from '../components/TitleAndButton'

export default async function Customer() {
  const session = await getServerSession(authOptions)
  const customers = await prismaClient.customer.findMany({
    where: { userId: session?.user.id },
  })

  return (
    <Container>
      <main>
        <TitleAndButton
          title="Meus Clientes"
          btnText="Novo"
          url="/dashboard/customer/new"
        />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.length > 0 ? (
            <>
              {customers.length > 0 &&
                customers.map((customer) => (
                  <CardCustomer key={customer.id} customer={customer} />
                ))}
            </>
          ) : (
            <p className="font-bold text-zinc-400">Nenhum cliente cadastrado</p>
          )}
        </section>
      </main>
    </Container>
  )
}
