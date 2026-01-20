import React from "react";

export default function LeftNavBar({ value }: { value: string }) {
  return (
    <div>
      <h3 className="font-roboto cursor-pointer py-1 text-xs font-bold text-white hover:text-[rgb(0,209,174)] sm:text-sm md:text-lg lg:text-xl xl:text-xl">
        {value}
      </h3>
    </div>
  );
}
