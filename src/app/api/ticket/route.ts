import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 })
    }
    const ticket = await prismaClient.ticket.findFirst({
      where: { id: id as string },
    })
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }
    await prismaClient.ticket.update({
      where: { id: ticket.id },
      data: { status: 'FECHADO' },
    })
    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { customerId, name, description } = await req.json()
    if (!customerId.trim() || !name.trim() || !description.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }
    await prismaClient.ticket.create({
      data: {
        name: name,
        dscription: description,
        status: 'ABERTO',
        customerId: customerId,
      },
    })
    return NextResponse.json({ message: 'Ticket created successfuly' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
