import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between shadow-md bg-white font-bold py-4 px-4">
      <div className="">
        My<span className="text-red-400">Food</span>
      </div>
      <div className="flex gap-6">
        <Link href="">All</Link>
        <Link href="">Rice</Link>
        <Link href="">Soup Food</Link>
        <Link href="">Burger</Link>
      </div>
    </nav>
  );
};

export default Navbar;
