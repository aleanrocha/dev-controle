'use client'

import { createContext, ReactNode, useState } from 'react'
import { TicketWithCustomerProps } from '@/interfaces/TicketProps'
import prismaClient from '@/lib/prisma'
import Modal from '@/components/Modal'

interface ModatContextData {
  visible: boolean
  handleModalVisible: () => void
  setDatailTicket: (data: TicketWithCustomerProps) => void
  ticket: TicketWithCustomerProps | null
}

export const ModalContext = createContext({} as ModatContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const [ticket, setTicket] = useState<TicketWithCustomerProps | null>(null)

  const handleModalVisible = () => {
    setVisible(!visible)
  }
  const setDatailTicket = async (datail: TicketWithCustomerProps) => {
    setTicket(datail)
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, setDatailTicket, ticket }}
    >
      {visible && <Modal />}
      {children}
    </ModalContext.Provider>
  )
}
