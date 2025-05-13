import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }
    const { name, email, phone, address, userId } = await req.json()
    if (!name.trim() || !email.trim() || !userId.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : '',
        userId: userId,
      },
    })
    return NextResponse.json({ message: 'Client created successfully' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('id')
    if (!userId) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    const findTickets = await prismaClient.ticket.findFirst({
      where: { customerId: userId, status: 'ABERTO' },
    })
    if (findTickets) {
      return NextResponse.json(
        { error: 'Failed delete customer' },
        { status: 400 }
      )
    }
    await prismaClient.customer.delete({ where: { id: userId } })
    return NextResponse.json(
      { message: 'Client deleted Successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const customerEmail = searchParams.get('email')
    if (!customerEmail) {
      return NextResponse.json({ error: 'E-mail is required' }, { status: 400 })
    }
    const customer = await prismaClient.customer.findFirst({
      where: { email: customerEmail },
    })
    if (!customer) {
      return NextResponse.json({ error: 'E-mail not found' }, { status: 404 })
    }
    return NextResponse.json(customer)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
