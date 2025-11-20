"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

const Modal = ({ open, setOpen, food }) => {
  console.log(food);
  // const food = {
  //   name: "Fried rice and chicken",
  //   image: "/fried_rice.jpg",
  //   packages: [
  //     { name: "Large", price: 200 },
  //     { name: "Medium", price: 150 },
  //     { name: "Small", price: 100 },
  //   ],
  // };
  const [order, setOrder] = useState({
    // foodId, packageId, location, phone, notes
    foodId: food.id,
    packageId: "",
    location: "",
    phone: "",
    notes: "",
  });

  // console.log(order);

  const updateFood = (id) => {
    setOrder((prev) => ({
      ...prev,
      foodId: id,
    }));
  };

  const updatePackage = (user_package) => {
    setOrder((prev) => ({
      ...prev,
      packageId: user_package,
    }));
  };

  const updateLocation = (user_location) => {
    setOrder((prev) => ({
      ...prev,
      location: user_location,
    }));
  };

  const updateNotes = (user_notes) => {
    setOrder((prev) => ({
      ...prev,
      notes: user_notes,
    }));
  };

  const updatePhone = (user_phone) => {
    setOrder((prev) => ({
      ...prev,
      phone: user_phone,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (orderData) => {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to submit order");
    },
    onSuccess: () => {
      alert("Order submitted successfully");
      setOpen(false);
    },
    onError: () => {
      alert("Something went wrong");
    },
  });

  const submitFunction = (e) => {
    e.preventDefault();
    mutate(order);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="max-h-[96%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{food.name}</DialogTitle>
          <form onSubmit={submitFunction} className="space-y-2">
            <Image
              src={food.imageUrl}
              alt={food.name}
              width={500}
              height={20}
              className="w-full h-52 "
            />
            <div className="my-2">
              <h2 className="font-bold text-black text-xl mb-1">
                CHOOSE PACKAGE
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {food.packages.map((foodPackage, i) => (
                  <div
                    onClick={() => updatePackage(foodPackage.id)}
                    key={i}
                    className={`p-2 cursor-pointer ${
                      foodPackage.id === order.packageId
                        ? "bg-amber-400"
                        : "bg-gray-200"
                    }`}
                  >
                    {foodPackage.size}{" "}
                  </div>
                ))}
              </div>
            </div>
            <div className="my-2">
              <h2 className="font-bold text-black text-xl mb-1">
                ENTER LOCATION
              </h2>
              <input
                onChange={(e) => updateLocation(e.target.value)}
                type="text"
                value={order.location}
                className="border border-gray-200 w-full py-2 px-2"
              />
            </div>

            <div className="my-2">
              <h2 className="font-bold text-black text-xl mb-1">ENTER NOTES</h2>
              <textarea
                onChange={(e) => updateNotes(e.target.value)}
                type="text"
                value={order.notes}
                className="border border-gray-200 w-full py-2 px-2"
              />
            </div>

            <input
              className="bg-amber-500 mx-auto px-3 py-1 rounded-md"
              type="submit"
              value="submit"
            />

            {isPending && <div>Sending request to backend</div>}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
