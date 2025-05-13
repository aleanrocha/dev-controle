'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormTicket from '../components/FormTicket'
import { api } from '@/lib/api'
import { toast } from 'react-toastify'

const schema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Campo obrigatório'),
})

export type CustomerData = {
  name: string
  id: string
}
type FormData = z.infer<typeof schema>

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerData | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const customerPromise = api.get(`/api/customer/?email=${data.email}`)
    try {
      const res = await toast.promise(customerPromise, {
        pending: 'Pesquisando...',
        success: 'Encontrado com sucesso!',
        error: 'Nada encontrado!',
      })
      const customer: CustomerData = res.data
      setCustomer({ id: customer.id, name: customer.name })
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-xl sm:text-2xl font-bold text-center mt-8">
        {customer ? 'Abrir chamado' : 'Pesquisar chamado'}
      </h1>
      <main>
        {customer ? (
          <>
            <div className="flex items-center justify-between gap-2 mb-8">
              <p>
                Cliente selecionado:{' '}
                <strong className="text-blue-400">{customer.name}</strong>
              </p>
              <button
                type="button"
                className="w-8 h-8 font-bold rounded-full bg-red-400 hover:bg-red-500 transition cursor-pointer"
                onClick={() => setCustomer(null)}
              >
                x
              </button>
            </div>
            <FormTicket customer={customer} />
          </>
        ) : (
          <>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input"
                  placeholder="Digite o e-mail"
                  {...register('email')}
                />
                <p className="text-sm text-red-400">{errors.email?.message}</p>
              </div>
              <input type="submit" value="Pesquisar" className="btn w-full" />
            </form>
          </>
        )}
      </main>
    </div>
  )
}
