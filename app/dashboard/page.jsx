"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  const {
    isPending,
    isError,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/order");
      return res.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({ id, isComplete }) => {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isComplete }),
      });
      if (!res.ok) throw new Error("Failed to mark order served");
    },
    onSuccess: () => {
      alert("Order marked served successfully");
      setOpen(false);
    },
    onError: () => {
      alert("Something went wrong");
    },
  });

  if (orders) {
    console.log(orders);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <div className="space-y-4">
        {isPending && <p>Loading.....</p>}

        {orders &&
          orders.map((order, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div>
                <p>
                  <strong>#{i + 1}</strong>
                </p>
                <p>
                  <strong>Food:</strong> {order.food.name}
                </p>
                <p>
                  <strong>Package:</strong> {order.package.size}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Location:</strong> {order.location}
                </p>
              </div>

              <input
                checked={order.isComplete}
                onChange={() => {
                  mutate({ id: order.id, isComplete: !order.isComplete });
                }}
                type="checkbox"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
