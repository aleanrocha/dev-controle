'use client'

import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { api } from '@/lib/api'

import Container from '@/components/Container'
import TitleAndButton from '../../components/TitleAndButton'

const schema = z.object({
  fullname: z.string().min(1, 'Campo Obrigatório'),
  email: z.string().email('E-mail inválido').min(1, 'Campo obrigatório'),
  phone: z.string().refine((value) => {
    return /^(?:\d{2}\s?)?\d{9}$/.test(value)
  }, 'Número inválido => 99 999999999'),
  address: z.string(),
})

type Inputs = z.infer<typeof schema>

export default function NewCustomer() {
  const session = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = api.post('/api/customer', {
        name: data.fullname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        userId: session.data?.user.id,
      })
      await toast.promise(res, {
        pending: 'Cadastrando...',
        success: 'Cadastrado com sucesso.',
        error: 'Deu ruim, tente novamente!',
      })
      setTimeout(() => {
        router.replace('/dashboard/customer')
      }, 1500)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <main className="py-4">
        <TitleAndButton
          title="Novo Cliente"
          btnText="Voltar"
          url="/dashboard/customer"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className="input-wrapper">
            <label htmlFor="fullname">Nome completo</label>
            <input
              type="text"
              id="fullname"
              placeholder="Nome completo do cliente"
              {...register('fullname')}
              className="input"
            />
            <p className="text-sm text-red-400 h-3">
              {errors.fullname?.message}
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row sm:gap-4">
            <div className="input-wrapper flex-1">
              <label htmlFor="phone">Telefone</label>
              <input
                type="text"
                id="phone"
                placeholder="Telefone do cliente"
                {...register('phone')}
                className="input"
              />
              <p className="text-sm text-red-400 h-3">
                {errors.phone?.message}
              </p>
            </div>
            <div className="input-wrapper flex-1">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                placeholder="E-mail do cliente"
                {...register('email')}
                className="input"
              />
              <p className="text-sm text-red-400 h-3">
                {errors.email?.message}
              </p>
            </div>
          </div>
          <div className="input-wrapper flex-1">
            <label htmlFor="address">Endereço (Opcional)</label>
            <input
              type="text"
              id="address"
              placeholder="Rua, número, bairro e cidade"
              {...register('address')}
              className="input"
            />
            <p className="text-sm text-red-400 h-3">
              {errors.address?.message}
            </p>
          </div>
          <input type="submit" value="Cadastrar" className="btn w-full mt-2" />
        </form>
      </main>
    </Container>
  )
}
