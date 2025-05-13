'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { api } from '@/lib/api'
import { TicketWithCustomerProps } from '@/interfaces/TicketProps'
import { ModalContext } from '@/providers/modal'
import { toast } from 'react-toastify'

export function TicketItemDesktop({
  tickets,
}: {
  tickets: TicketWithCustomerProps[]
}) {
  const router = useRouter()
  const { setDatailTicket, handleModalVisible } = useContext(ModalContext)
  const handleChangeStatus = async (id: string) => {
    try {
      const res = api.patch('/api/ticket', { id: id })
      await toast.promise(res, {
        pending: 'Alterando status...',
        success: 'Status alterado!',
        error: 'Error, tente novamente!',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const handleOPenModal = (ticket: TicketWithCustomerProps) => {
    handleModalVisible()
    setDatailTicket(ticket)
  }
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-gray-800">
        <tr>
          <th className="p-4 text-left">Nome</th>
          <th className="p-4 text-left">Cadastrado</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Ação</th>
        </tr>
      </thead>
      <tbody className="bg-zinc-900 divide-y divide-zinc-500 text-zinc-400">
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="hover:bg-zinc-800/20 transition">
            <td className="px-4 py-3">{ticket.name}</td>
            <td className="p-4">
              {ticket.createdAt.toLocaleDateString('pt-br')}
            </td>
            <td
              className={`${ticket.status === 'ABERTO' ? 'text-green-400' : 'text-red-400'} font-bold p-4 `}
            >
              {ticket.status}
            </td>
            <td className="p-4 cursor-pointer flex gap-3">
              <button
                type="button"
                onClick={() => handleChangeStatus(ticket.id)}
                className="text-red-400 hover:text-red-500 cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => handleOPenModal(ticket)}
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
              >
                Visualizar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function TicketItemMobile({
  tickets,
}: {
  tickets: TicketWithCustomerProps[]
}) {
  const { handleModalVisible, setDatailTicket } = useContext(ModalContext)
  const router = useRouter()
  const handleChangeStatus = async (id: string) => {
    try {
      const res = api.patch('/api/ticket', { id: id })
      await toast.promise(res, {
        pending: 'Alterando status...',
        success: 'Status alterado!',
        error: 'Error, tente novamente!',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const handleOPenModal = (ticket: TicketWithCustomerProps) => {
    handleModalVisible()
    setDatailTicket(ticket)
  }
  return (
    <>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-zinc-900 p-4 rounded-sm flex flex-col gap-4"
        >
          <p className="text-zinc-400">
            <span className="text-white font-bold">Nome:</span> {ticket.name}
          </p>
          <p className="text-zinc-400">
            <span className="font-bold text-white">Cadastrado: </span>
            {ticket.createdAt.toLocaleDateString('pt-br')}
          </p>
          <p
            className={`${ticket.status === 'ABERTO' ? 'text-green-400' : 'text-red-400'}`}
          >
            <span className="font-bold text-white">Status: </span>
            {ticket.status}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleChangeStatus(ticket.id)}
              type="button"
              className="btn red"
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => handleOPenModal(ticket)}
            >
              Info
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
