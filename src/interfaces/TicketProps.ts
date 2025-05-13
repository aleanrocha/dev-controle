import { CustomerProps } from './CustomerProps'

export interface TicketProps {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string | null
  dscription: string
  status: string
  customerId: string | null
}

export interface TicketWithCustomerProps {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string | null
  dscription: string
  status: string
  customerId: string | null
  customer: CustomerProps | null
}
