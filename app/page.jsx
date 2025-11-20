"use client";
import FoodCard from "@/components/FoodCard";
import Modal from "@/components/Modal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { foods } from "@/utils/foods";

const page = () => {
  const {
    isPending,
    isError,
    data: foods,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await fetch("/api/food");
      return res.json();
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <section className="my-4 mx-12 grid grid-cols-4 min-h-screen">
      {isPending && <div>Loading....</div>}
      {isError && <div>Error</div>}
      {foods?.length >= 1 &&
        foods?.map((food, i) => (
          <FoodCard
            onClick={() => {
              setSelectedFood(food);
              setOpen(true);
            }}
            food={food}
            key={i}
          />
        ))}

      {selectedFood && open && (
        <Modal food={selectedFood} open={open} setOpen={setOpen} />
      )}
    </section>
  );
};

export default page;
