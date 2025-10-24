import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  console.log(data);

  //   const order = await Prisma.Order.create({
  //     data: {
  //       packageId: "",
  //       location: "",
  //       phone: "",
  //       notes: "",
  //     },
  //   });

  return NextResponse.json(data);
}
