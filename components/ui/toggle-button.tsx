"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // or your custom 

export default function ToggleButtons() {
  const [selected, setSelected] = useState<"retailer" | "wholesaler">("retailer");

  return (
    <div className="flex items-center border-2 rounded-xl mt-5 w-fit p-1">
      <Button
        onClick={() => setSelected("retailer")}
        className={`rounded-md md:text-xl text-xs w-fit ${
          selected === "retailer"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Retailer
      </Button>

      <Button
        onClick={() => setSelected("wholesaler")}
        className={`rounded-md text-xs md:text-xl w-fit ${
          selected === "wholesaler"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Wholesaler
      </Button>
    </div>
  );
}
