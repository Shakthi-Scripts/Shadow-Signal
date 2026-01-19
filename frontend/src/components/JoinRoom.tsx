"use client";

import React, { useState, useRef } from "react";
import api from "../libs/api";

export default function JoinRoom() {
  const [accessCode, setAccessCode] = useState<string[]>(["", "", "", "", ""]);
  const [alias, setAlias] = useState<string>("");
  const [aliasError, setAliasError] = useState<string>("");
  const [accessCodeError, setAccessCodeError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAccessCodeChange = (index: number, value: string) => {
    const letter = value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 1);

    const newCode = [...accessCode];
    newCode[index] = letter;
    setAccessCode(newCode);
    setAccessCodeError("");

    if (letter && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleAccessCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !accessCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAccessCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 5);
    const newCode = ["", "", "", "", ""];
    for (let i = 0; i < pastedText.length && i < 5; i++) {
      newCode[i] = pastedText[i];
    }
    setAccessCode(newCode);
    setAccessCodeError("");
    const nextEmptyIndex = newCode.findIndex((char) => !char);
    const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleJoinRoom = async () => {
    const codeString = accessCode.join("");
    if (codeString.length !== 5 || alias.length === 0) {
      if (codeString.length !== 5) {
        setAccessCodeError("Access code must be exactly 5 letters");
      }
      return;
    }
    if (alias.length >= 20) {
      setAliasError("Alias must be less than 20 characters");
      return;
    }
    setAliasError("");
    setAccessCodeError("");
    try {
      const result = await api.joinRoom(codeString, alias);
      if (result.success && result.inviteCode && result.playerId) {
        localStorage.setItem("playerAlias", alias);
        localStorage.setItem("playerId", result.playerId);
        window.location.href = `/game/${result.inviteCode}`;
      } else {
        alert(result.error || "Failed to join room");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to join room");
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute -inset-px -z-10 rounded-xl bg-[rgb(0,209,174)] opacity-30 blur-lg" />

      <div className="relative rounded-xl border border-emerald-400/30 bg-emerald-950/40 p-8 backdrop-blur-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-[rgb(0,209,174)]">
            terminal
          </span>

          <h3 className="text-lg font-semibold tracking-wide text-white">
            INFILTRATE OPERATION
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs tracking-widest text-[rgb(0,209,174)]">
              ACCESS CODE
            </label>
            <div className="flex gap-2">
              {accessCode.map((char, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={char}
                  onInput={(e) =>
                    handleAccessCodeChange(index, e.currentTarget.value)
                  }
                  onKeyDown={(e) => handleAccessCodeKeyDown(index, e)}
                  onPaste={handleAccessCodePaste}
                  type="text"
                  maxLength={1}
                  className="w-12 rounded-md border border-white/10 bg-black/30 px-3 py-3 text-center text-lg font-semibold text-white uppercase placeholder-white/30 focus:border-emerald-400/60 focus:outline-none"
                  placeholder="-"
                />
              ))}
            </div>
            {accessCodeError && (
              <p className="mt-1 text-xs text-red-400">{accessCodeError}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs tracking-widest text-[rgb(0,209,174)]">
              OPERATOR ID
            </label>
            <input
              onInput={(e) => {
                const value = e.currentTarget.value;
                setAlias(value);
                if (value.length >= 20) {
                  setAliasError("Alias must be less than 20 characters");
                } else {
                  setAliasError("");
                }
              }}
              type="text"
              placeholder="Enter Alias"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400/60 focus:outline-none"
            />
            {aliasError && (
              <p className="mt-1 text-xs text-red-400">{aliasError}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleJoinRoom}
            disabled={
              alias.length === 0 ||
              alias.length >= 20 ||
              accessCode.join("").length !== 5
            }
            className="rounded-md bg-[rgb(0,209,174)] px-6 py-3 text-sm font-semibold tracking-widest text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            JOIN ROOM
          </button>

          <span className="text-xs text-white/40 italic">
            Authenticating via encrypted tunnel...
          </span>
        </div>
      </div>
    </div>
  );
}
