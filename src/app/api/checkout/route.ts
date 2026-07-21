import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, landmark, pincode, quantity, color } = body;

    if (!name || !phone || !address || !pincode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Railway PostgreSQL Database via Prisma
    const order = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        address,
        landmark,
        pincode,
        color: color || "black",
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
