"use client";

import { useState } from "react";

type Direction = "trust" | "care" | "formal" | "aurora" | "sunrise" | "editorial";

const directions: Record<Direction, { label: string; subtitle: string; description: string; root: string; accent: string; badge: string; hero: string; visual: string; card: string; serif?: boolean }> = {
  trust: { label: "Trust & Modern", subtitle: "Professional. Clear. Confident.", description: "A premium finance-inspired experience built around clarity and trust.", root: "bg-[#f4f8ff]", accent: "bg-blue-700", badge: "bg-blue-100 text-blue-800", hero: "bg-[radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_42%),linear-gradient(135deg,_#eff6ff,_#ffffff_55%,_#eef2ff)]", visual: "bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900", card: "bg-slate-50" },
  care: { label: "Community Care", subtitle: "Warm. Supportive. Human.", description: "A friendly, student-first experience that highlights people helping people.", root: "bg-[#fff8fd]", accent: "bg-fuchsia-600", badge: "bg-fuchsia-100 text-fuchsia-800", hero: "bg-[radial-gradient(circle_at_top_right,_#fbcfe8,_transparent_40%),radial-gradient(circle_at_bottom_left,_#ddd6fe,_transparent_45%),#fffaff]", visual: "bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-800", card: "bg-slate-50" },
  formal: { label: "Institutional Clarity", subtitle: "Serious. Structured. Reliable.", description: "A formal college-service experience with an orderly, official presentation.", root: "bg-slate-100", accent: "bg-slate-800", badge: "bg-slate-100 text-slate-700", hero: "bg-white", visual: "bg-gradient-to-br from-slate-800 to-slate-950", card: "border-l-2 border-slate-300 pl-4", serif: true },
  aurora: { label: "Aurora Glass", subtitle: "Luminous. Premium. Memorable.", description: "A midnight interface with glowing aurora colors and elegant glass panels that make SEF feel special at first glance.", root: "bg-[#080b20] text-white", accent: "bg-cyan-400 text-slate-950", badge: "bg-white/15 text-cyan-100", hero: "bg-[radial-gradient(circle_at_80%_15%,_#9333ea_0,_transparent_27%),radial-gradient(circle_at_15%_80%,_#0891b2_0,_transparent_31%),linear-gradient(135deg,_#090b25,_#17104a_55%,_#061c36)]", visual: "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500", card: "border border-white/10 bg-white/10 text-white backdrop-blur" },
  sunrise: { label: "Sunrise Hope", subtitle: "Optimistic. Energetic. Uplifting.", description: "A warm, optimistic style that gives the platform a hopeful beginning-of-the-day energy.", root: "bg-[#fff8ed]", accent: "bg-orange-500", badge: "bg-orange-100 text-orange-800", hero: "bg-[radial-gradient(circle_at_85%_12%,_#fed7aa,_transparent_32%),radial-gradient(circle_at_12%_85%,_#fde68a,_transparent_32%),#fff9f0]", visual: "bg-gradient-to-br from-orange-400 via-rose-500 to-violet-700", card: "bg-white shadow-sm" },
  editorial: { label: "Bold Editorial", subtitle: "Distinct. Creative. Shareable.", description: "A high-contrast, magazine-inspired experience designed to stand out in a portfolio or Instagram post.", root: "bg-[#f5f5f0]", accent: "bg-lime-400 text-slate-950", badge: "bg-lime-300 text-slate-950", hero: "bg-[#f5f5f0]", visual: "bg-gradient-to-br from-slate-950 via-slate-800 to-blue-900", card: "border-2 border-slate-900 bg-[#f5f5f0]" },
};

export default function UiDemoPage() {
  const [direction, setDirection] = useState<Direction>("trust");
  const current = directions[direction];
  const dark = direction === "aurora";
  const textMuted = dark ? "text-slate-300" : "text-slate-600";
  const surface = dark ? "border border-white/10 bg-white/10 backdrop-blur-xl" : direction === "formal" ? "rounded-lg border border-slate-300 bg-white shadow-xl" : "rounded-[2rem] bg-white shadow-2xl";

  return (
    <main className={`min-h-screen ${current.root}`}>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-cyan-200" : "text-blue-600"}`}>SEF visual demo</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Choose the new SEF style</h1>
            <p className={`mt-2 max-w-2xl ${textMuted}`}>This is a preview only. Your existing homepage will not change until you choose a direction.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a visual direction">
            {(Object.keys(directions) as Direction[]).map((option) => (
              <button key={option} onClick={() => setDirection(option)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${direction === option ? `${current.accent} shadow-lg` : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-slate-600 shadow-sm hover:bg-slate-50"}`}>
                {directions[option].label}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-10 overflow-hidden ${surface}`}>
          <div className={`flex items-center justify-between px-6 py-5 sm:px-9 ${dark ? "border-b border-white/10" : "border-b border-slate-100"}`}>
            <span className={`text-xl font-black tracking-tight ${dark ? "text-cyan-200" : direction === "care" ? "text-fuchsia-700" : direction === "sunrise" ? "text-orange-600" : "text-blue-700"}`}>SEF</span>
            <div className={`flex items-center gap-3 text-sm font-semibold ${dark ? "text-slate-200" : ""}`}><span className="hidden sm:inline">How it works</span><button className={`rounded-xl px-4 py-2 font-bold ${current.accent}`}>Login</button></div>
          </div>

          <div className={`grid gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_.9fr] lg:py-20 ${current.hero}`}>
            <div className="self-center">
              <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${current.badge}`}>Students supporting students</span>
              <h2 className={`mt-6 max-w-xl text-4xl font-black leading-tight sm:text-5xl ${current.serif ? "font-serif" : ""}`}>Help should arrive when students need it most.</h2>
              <p className={`mt-5 max-w-lg text-lg leading-8 ${textMuted}`}>{current.description} SEF makes monthly contributions and emergency support simple, transparent, and secure.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button className={`rounded-xl px-6 py-3 font-bold shadow-lg ${current.accent}`}>Join SEF</button><button className={`rounded-xl border px-6 py-3 font-bold ${dark ? "border-white/20 bg-white/10 text-white" : "border-slate-200 bg-white text-slate-700"}`}>See how it works</button></div>
              <div className="mt-10 flex flex-wrap gap-7 text-sm"><span><strong className="block text-xl">₹100</strong><span className={textMuted}>Monthly contribution</span></span><span><strong className="block text-xl">24/7</strong><span className={textMuted}>Support requests</span></span><span><strong className="block text-xl">100%</strong><span className={textMuted}>Verified payments</span></span></div>
            </div>

            <div className={`relative min-h-[360px] overflow-hidden ${direction === "formal" ? "border border-slate-200" : "rounded-[2rem]"} ${current.visual}`}>
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/15" /><div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative m-6 mt-16 rounded-2xl bg-white p-6 text-slate-900 shadow-2xl sm:m-10 sm:mt-16">
                <div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Welcome back</p><p className="text-xl font-black">Student dashboard</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Active</span></div>
                <div className="mt-6 rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">This month&apos;s contribution</p><div className="mt-2 flex items-end justify-between"><strong className="text-3xl">₹100</strong><button className={`rounded-lg px-3 py-2 text-sm font-bold ${current.accent}`}>Pay now</button></div></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">Requests</p><p className="mt-1 font-bold">Track support</p></div><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">Payments</p><p className="mt-1 font-bold">Verified</p></div></div>
              </div>
            </div>
          </div>

          <div className={`grid gap-4 px-6 py-8 sm:grid-cols-3 sm:px-12 ${dark ? "bg-slate-950/30" : ""}`}>
            {["Clear payment flow", "Private student support", "Simple verification"].map((feature, index) => (<div key={feature} className={`rounded-2xl p-5 ${current.card}`}><p className={`text-sm font-black ${dark ? "text-cyan-200" : "text-blue-700"}`}>0{index + 1}</p><p className="mt-2 font-bold">{feature}</p><p className={`mt-1 text-sm ${textMuted}`}>Designed to make every step easy to understand.</p></div>))}
          </div>
        </div>

        <div className="mt-8 text-center"><p className="font-bold">Current preview: {current.label}</p><p className={`mt-1 ${textMuted}`}>{current.subtitle}</p></div>
      </section>
    </main>
  );
}
