import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      food: true,
      package: true,
    },
  });

  return NextResponse.json(orders);
}

export async function PATCH(req) {
  const { id, isComplete } = await req.json();

  const updated = await prisma.order.update({
    where: { id },
    data: { isComplete },
  });

  return NextResponse.json(updated);
}

export async function POST(req) {
  const data = await req.json();

  console.log(data);

  if (!data.foodId || !data.packageId || !data.location) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const order = await prisma.Order.create({
    data: {
      foodId: data.foodId,
      packageId: data.packageId,
      location: data.location,
      phone: data.phone,
      // notes: data.notes,
    },
  });

  return NextResponse.json(data);
}
