"use client";

import { useState } from "react";

type Direction = "trust" | "care" | "formal";

const directions: Record<Direction, { label: string; subtitle: string; description: string }> = {
  trust: {
    label: "Trust & Modern",
    subtitle: "Professional. Clear. Confident.",
    description: "A premium finance-inspired experience built around clarity and trust.",
  },
  care: {
    label: "Community Care",
    subtitle: "Warm. Supportive. Human.",
    description: "A friendly, student-first experience that highlights people helping people.",
  },
  formal: {
    label: "Institutional Clarity",
    subtitle: "Serious. Structured. Reliable.",
    description: "A formal college-service experience with an orderly, official presentation.",
  },
};

export default function UiDemoPage() {
  const [direction, setDirection] = useState<Direction>("trust");
  const current = directions[direction];

  return (
    <main className={direction === "trust" ? "min-h-screen bg-[#f4f8ff] text-slate-900" : direction === "care" ? "min-h-screen bg-[#fff8fd] text-slate-900" : "min-h-screen bg-slate-100 text-slate-900"}>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">SEF visual demo</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Choose the new SEF style</h1>
            <p className="mt-2 max-w-2xl text-slate-600">This is a preview only. Your existing homepage will not change until you choose a direction.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a visual direction">
            {(Object.keys(directions) as Direction[]).map((option) => (
              <button key={option} onClick={() => setDirection(option)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${direction === option ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"}`}>
                {directions[option].label}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-10 overflow-hidden ${direction === "formal" ? "rounded-lg border border-slate-300 bg-white shadow-xl" : "rounded-[2rem] bg-white shadow-2xl"}`}>
          <div className={`flex items-center justify-between px-6 py-5 sm:px-9 ${direction === "trust" ? "border-b border-blue-100" : direction === "care" ? "border-b border-fuchsia-100" : "border-b border-slate-200"}`}>
            <span className={`text-xl font-black tracking-tight ${direction === "care" ? "text-fuchsia-700" : direction === "formal" ? "text-slate-900" : "text-blue-700"}`}>SEF</span>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="hidden sm:inline">How it works</span>
              <button className={`rounded-xl px-4 py-2 text-white ${direction === "care" ? "bg-fuchsia-600" : direction === "formal" ? "bg-slate-800" : "bg-blue-700"}`}>Login</button>
            </div>
          </div>

          <div className={direction === "trust" ? "grid gap-10 bg-[radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_42%),linear-gradient(135deg,_#eff6ff,_#ffffff_55%,_#eef2ff)] px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_.9fr] lg:py-20" : direction === "care" ? "grid gap-10 bg-[radial-gradient(circle_at_top_right,_#fbcfe8,_transparent_40%),radial-gradient(circle_at_bottom_left,_#ddd6fe,_transparent_45%),#fffaff] px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_.9fr] lg:py-20" : "grid gap-10 bg-white px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_.9fr] lg:py-20"}>
            <div className="self-center">
              <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${direction === "care" ? "bg-fuchsia-100 text-fuchsia-800" : direction === "formal" ? "bg-slate-100 text-slate-700" : "bg-blue-100 text-blue-800"}`}>Students supporting students</span>
              <h2 className={`mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl ${direction === "formal" ? "font-serif" : ""}`}>Help should arrive when students need it most.</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">{current.description} SEF makes monthly contributions and emergency support simple, transparent, and secure.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className={`rounded-xl px-6 py-3 font-bold text-white shadow-lg ${direction === "care" ? "bg-fuchsia-600 shadow-fuchsia-200" : direction === "formal" ? "bg-slate-800 shadow-slate-200" : "bg-blue-700 shadow-blue-200"}`}>Join SEF</button>
                <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700">See how it works</button>
              </div>
              <div className="mt-10 flex flex-wrap gap-7 text-sm">
                <span><strong className="block text-xl">₹100</strong><span className="text-slate-500">Monthly contribution</span></span>
                <span><strong className="block text-xl">24/7</strong><span className="text-slate-500">Support requests</span></span>
                <span><strong className="block text-xl">100%</strong><span className="text-slate-500">Verified payments</span></span>
              </div>
            </div>

            <div className={`relative min-h-[360px] overflow-hidden ${direction === "formal" ? "border border-slate-200 bg-slate-50" : "rounded-[2rem]"}`}>
              <div className={direction === "trust" ? "absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900" : direction === "care" ? "absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-800" : "absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"} />
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/15" />
              <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative m-6 mt-16 rounded-2xl bg-white p-6 shadow-2xl sm:m-10 sm:mt-16">
                <div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Welcome back</p><p className="text-xl font-black">Student dashboard</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Active</span></div>
                <div className="mt-6 rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">This month&apos;s contribution</p><div className="mt-2 flex items-end justify-between"><strong className="text-3xl">₹100</strong><button className={`rounded-lg px-3 py-2 text-sm font-bold text-white ${direction === "care" ? "bg-fuchsia-600" : direction === "formal" ? "bg-slate-800" : "bg-blue-700"}`}>Pay now</button></div></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">Requests</p><p className="mt-1 font-bold">Track support</p></div><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">Payments</p><p className="mt-1 font-bold">Verified</p></div></div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-8 sm:grid-cols-3 sm:px-12">
            {["Clear payment flow", "Private student support", "Simple verification"].map((feature, index) => (
              <div key={feature} className={direction === "formal" ? "border-l-2 border-slate-300 pl-4" : "rounded-2xl bg-slate-50 p-5"}>
                <p className={`text-sm font-black ${direction === "care" ? "text-fuchsia-700" : direction === "formal" ? "text-slate-600" : "text-blue-700"}`}>0{index + 1}</p>
                <p className="mt-2 font-bold">{feature}</p>
                <p className="mt-1 text-sm text-slate-500">Designed to make every step easy to understand.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center"><p className="font-bold">Current preview: {current.label}</p><p className="mt-1 text-slate-600">{current.subtitle}</p></div>
      </section>
    </main>
  );
}
