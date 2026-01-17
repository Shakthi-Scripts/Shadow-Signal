import React from "react";

function StartGameButton() {
  return (
    <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-emerald-400 py-4 text-lg font-bold tracking-widest text-white transition hover:bg-emerald-300">
      <span className="material-symbols-outlined text-white">hourglass</span>
      GAME START IN 5
    </button>
  );
}

export default StartGameButton;
