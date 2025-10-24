"use client";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";

const FoodCard = ({ food }) => {
  const lowestPackagePrice = food.packages[food.packages.length - 1].price;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white w-72 flex flex-col justify-center items-center py-4 shadow-md rounded-lg gap-4 h-72"
      >
        <Image
          src={food.imageUrl}
          alt="fried yam"
          width={100}
          height={100}
          className="w-40 h-40 rounded-full"
        />
        <h2 className="font-bold">{food.name}</h2>
        <h4 className="text-amber-400">¢{lowestPackagePrice}</h4>
      </div>

      <Modal food={food} open={open} setOpen={setOpen} />
    </>
  );
};

export default FoodCard;
