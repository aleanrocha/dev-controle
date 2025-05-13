import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import Link from 'next/link'

import Container from '@/components/Container'
import TitleAndButton from '../../components/TitleAndButton'

export default async function NewTicket() {
  const session = await getServerSession(authOptions)
  const customers = await prismaClient.customer.findMany({
    where: { userId: session?.user.id },
  })
  async function handleRegisterTicket(formData: FormData) {
    'use server'
    const name = formData.get('ticketName')
    const description = formData.get('ticketDescription')
    const client = formData.get('clientSelect')
    if (!name || !description || !client) {
      console.log('name, description and client are required')
      return
    }
    try {
      const res = await prismaClient.ticket.create({
        data: {
          name: name as string,
          dscription: description as string,
          status: 'ABERTO',
          customerId: client as string,
          userId: session?.user.id,
        },
      })
    } catch (error) {
      console.log(error)
    }
    redirect('/dashboard')
  }
  return (
    <Container>
      <main>
        <TitleAndButton
          title="Novo Chamado"
          btnText="Voltar"
          url="/dashboard"
        />
        <form
          action={handleRegisterTicket}
          className="form-container flex flex-col gap-2"
        >
          <div className="input-wrapper">
            <label htmlFor="ticketName">Nome do chamado:</label>
            <input
              type="text"
              name="ticketName"
              id="ticketName"
              placeholder="Digite o nome do chamado"
              className="input"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="ticketDescription">Descreva o chamado:</label>
            <textarea
              name="ticketDescription"
              id="ticketDescription"
              placeholder="Descreva aqui seu chamado..."
              className="input h-28 resize-none"
            ></textarea>
          </div>
          {customers.length !== 0 ? (
            <div className="input-wrapper">
              <label htmlFor="clientSelect">Selecione o cliente:</label>
              <select
                name="clientSelect"
                id="clientSelect"
                className="input bg-zinc-700"
              >
                {customers.map((ct) => (
                  <option value={ct.id} key={ct.id}>
                    {ct.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p>
              Você não tem nenhum cliente cadastrado.{' '}
              <Link
                href={'/dashboard/customer/new'}
                className="text-blue-500 underline"
              >
                Criar cliente?
              </Link>
            </p>
          )}
          <input
            type="submit"
            value="Salvar"
            className="btn w-full mt-4 disabled:hover:bg-zinc-600 disabled:bg-zinc-600 disabled:cursor-not-allowed"
            disabled={customers.length === 0 ? true : false}
          />
        </form>
      </main>
    </Container>
  )
}
