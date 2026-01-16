import React from "react";

export default function LeftNavBar({ value }: { value: string }) {
  return (
    <div>
      <h3 className="text-md font-xm font-roboto py-1 font-bold text-white hover:text-[rgb(0,209,174)]">
        {value}
      </h3>
    </div>
  );
}
