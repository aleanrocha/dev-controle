'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { CustomerProps } from '@/interfaces/CustomerProps'
import { api } from '@/lib/api'

export default function CardCustomer({
  customer,
}: {
  customer: CustomerProps
}) {
  const router = useRouter()
  const handleDelete = async (id: string) => {
    try {
      const deleteCustomer = api.delete(`/api/customer/?id=${id}`)
      await toast.promise(deleteCustomer, {
        pending: 'Excluindo...',
        success: 'Excluido com sucesso!',
        error: 'Erro, cliente pode ter ticket em aberto.',
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <article className="bg-zinc-800 p-4 flex flex-col gap-3">
      <p className="font-bold">
        Nome: <span className="text-zinc-400">{customer.name}</span>
      </p>
      <p className="font-bold">
        E-mail: <span className="text-zinc-400">{customer.email}</span>
      </p>
      <p className="font-bold">
        Telefone: <span className="text-zinc-400">{customer.phone}</span>
      </p>
      <p className="font-bold">
        Endereço:{' '}
        <span className="text-zinc-400">
          {customer.address !== undefined && customer.address !== ''
            ? customer.address
            : 'Não definido'}{' '}
        </span>
      </p>
      <button
        onClick={() => handleDelete(customer.id)}
        type="button"
        className="bg-red-400 py-2 px-4 mt-4 font-bold rounded-sm hover:bg-red-500 transition cursor-pointer"
      >
        Excluir
      </button>
    </article>
  )
}
