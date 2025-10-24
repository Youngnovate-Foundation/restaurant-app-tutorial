const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const foods = [
  {
    name: "Fried Rice and Chicken",
    imageUrl: "/fried_rice.jpg",
    packages: [
      { size: "Big combo", price: 200 },
      { size: "Medium", price: 150 },
      { size: "Small", price: 100 },
    ],
  },
  {
    name: "Jollof Rice and Chicken",
    imageUrl: "/jollof.jpg",
    packages: [
      { size: "Large", price: 200 },
      { size: "Medium", price: 150 },
      { size: "Small", price: 100 },
    ],
  },
  {
    name: "Banku and Tilapia",
    imageUrl: "/banku.jpg",
    packages: [
      { size: "Large", price: 250 },
      { size: "Medium", price: 180 },
      { size: "Small", price: 120 },
    ],
  },
  {
    name: "Fried Yam and Chofi",
    imageUrl: "/fried_yam.jpg",
    packages: [
      { size: "Large", price: 180 },
      { size: "Medium", price: 130 },
      { size: "Small", price: 90 },
    ],
  },
  {
    name: "Beef Burger",
    imageUrl: "/burger.jpg",
    packages: [
      { size: "Double", price: 220 },
      { size: "Regular", price: 160 },
      { size: "Mini", price: 100 },
    ],
  },
  {
    name: "Spicy Noodles and Egg",
    imageUrl: "/noodles.jpg",
    packages: [
      { size: "Large", price: 150 },
      { size: "Medium", price: 100 },
      { size: "Small", price: 70 },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");
  for (const food of foods) {
    await prisma.food.create({
      data: {
        name: food.name,
        imageUrl: food.imageUrl,
        packages: {
          create: food.packages.map((pkg) => ({
            size: pkg.size,
            price: pkg.price,
          })),
        },
      },
    });
  }
  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
