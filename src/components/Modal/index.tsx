'use client'

import { useContext, useRef, MouseEvent } from 'react'
import { ModalContext } from '@/providers/modal'

export default function Modal() {
  const { handleModalVisible, ticket } = useContext(ModalContext)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const handleModalClick = (e: MouseEvent<HTMLElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible()
    }
  }
  return (
    <section
      className="w-full min-h-screen fixed bg-zinc-900/80 flex justify-center items-center p-4"
      onClick={handleModalClick}
    >
      <div
        ref={modalRef}
        className="bg-zinc-700 p-4 w-full max-w-2xl rounded-lg"
      >
        <div className="flex justify-between items-center gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Detalhes do chamado</h2>
          <button className="btn red" onClick={handleModalVisible}>
            Fechar
          </button>
        </div>
        <div className="flex items-center flew-wrap gap-2 mb-4">
          <h3 className="font-bold">Nome:</h3>
          <p>{ticket?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Descrição:</h3>
          <p>{ticket?.dscription}</p>
        </div>
        <hr className="my-4" />
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Detalhes do cliente
        </h2>
        <div className="flex items-center flew-wrap gap-2 mb-4">
          <h3 className="font-bold">Nome:</h3>
          <p>{ticket?.customer?.name}</p>
        </div>
        <div className="flex items-center flew-wrap gap-2 mb-4">
          <h3 className="font-bold">Telefone:</h3>
          <p>{ticket?.customer?.phone}</p>
        </div>
        <div className="flex items-center flew-wrap gap-2 mb-4">
          <h3 className="font-bold">E-mail:</h3>
          <p>{ticket?.customer?.email}</p>
        </div>
        <div className="flex items-center flew-wrap gap-2 mb-4">
          <h3 className="font-bold">Endereço:</h3>
          <p>
            {ticket?.customer?.address
              ? ticket?.customer?.address
              : 'Não definido'}
          </p>
        </div>
      </div>
    </section>
  )
}
