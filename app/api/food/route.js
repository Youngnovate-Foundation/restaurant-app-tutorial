import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(params) {
  const foods = await prisma.Food.findMany({ include: { packages: true } });
  // console.log(foods);
  return NextResponse.json(foods);
}
