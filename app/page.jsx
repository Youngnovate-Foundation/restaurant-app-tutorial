"use client";
import FoodCard from "@/components/FoodCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { foods } from "@/utils/foods";

const page = () => {
  // const [foods, setFoods] = useState("");
  // useEffect(() => {
  //   const fetchfoods = async () => {
  //     const res = await fetch("/api/food");
  //     const data = await res.json();
  //     setFoods(data);
  //   };

  //   fetchfoods();
  // }, []);

  // console.log(foods);

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

  return (
    <section className="my-4 mx-12 grid grid-cols-4 min-h-screen">
      {isPending && <div>Loading....</div>}
      {isError && <div>Error</div>}
      {foods?.length >= 1 &&
        foods?.map((food, i) => <FoodCard food={food} key={i} />)}
    </section>
  );
};

export default page;
