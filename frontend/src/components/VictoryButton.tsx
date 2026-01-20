import React from "react";

export default function VictoryButton() {
    return (
        <div className="mt-10 flex justify-center">
            <button className="group relative flex text-white items-center gap-3 rounded-lg bg-emerald-400 px-10 py-4 text-lg font-semibold tracking-widest shadow-[0_0_30px_rgba(0,209,174,0.45)] 
            transition hover:shadow-[0_0_40px_rgba(0,209,174,0.7)]">
                
                    <span className="material-symbols-outlined text-white ">
                        home
                    </span>
               
                BACK TO LOBBY
            </button>
        </div>
    );
}
