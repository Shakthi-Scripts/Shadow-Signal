import React from "react";

export default function LeftNavBar({ value }: { value: string }) {
  return (
    <div>
      <h3 className="cursor-pointer text-xs sm:text-sm md:text-lg lg:text-xl xl:text-xl font-roboto py-1 font-bold text-white hover:text-[rgb(0,209,174)]">
        {value}
      </h3>
    </div>
  );
}
