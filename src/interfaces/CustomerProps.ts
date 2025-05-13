export interface CustomerProps {
  name: string
  id: string
  email: string
  phone: string
  address: string | null
  createdAt: Date
  updatedAt: Date
  userId: string | null
}
