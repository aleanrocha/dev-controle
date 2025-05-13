import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerData } from '../../ticket/page'
import { api } from '@/lib/api'
import { toast } from 'react-toastify'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
})

type FormTicketProps = {
  customer: CustomerData
}
type FormData = z.infer<typeof schema>

export default function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = api.post('/api/ticket', {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    })
    await toast.promise(res, {
      pending: 'Salvando...',
      success: 'Salvo com sucesso!',
      error: 'Erro inesperado, tente novamente!',
    })
    reset()
  }
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="name">Nome do chamado:</label>
        <input
          type="text"
          id="name"
          placeholder="Digite o nome do chamdo"
          className="input"
          {...register('name')}
        />
        <p className="text-sm text-red-400">{errors.name?.message}</p>
      </div>
      <div className="input-wrapper">
        <label htmlFor="description">Descrição do chamado:</label>
        <textarea
          id="description"
          placeholder="Digite a descrição do chamdo"
          className="input h-28 resize-none"
          {...register('description')}
        ></textarea>
        <p className="text-sm text-red-400">{errors.description?.message}</p>
      </div>
      <input type="submit" value="Salvar chamado" className="btn w-full" />
    </form>
  )
}
