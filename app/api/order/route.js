import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  console.log(data);

  if (!data.packageId || !data.location || !data.phone) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  // const order = await Prisma.Order.create({
  //   data: {
  //     packageId: data.packageId,
  //     location: data.location,
  //     phone: data.phone,
  //     notes: data.notes,
  //   },
  // });

  return NextResponse.json(data);
}
