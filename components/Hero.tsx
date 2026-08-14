"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function Hero() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-8 py-24 md:flex-row">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Helping Students
            <span className="text-blue-600">
              {" "}During Emergencies
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            A student-driven emergency fund platform where
            every contribution creates support for students
            when they need it the most.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push(user ? "/dashboard" : "/login")}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {user ? "Dashboard" : "Login"}
            </button>

            <button
  onClick={() => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
>
  Learn More
</button>

          </div>

        </div>


        {/* Right Illustration Placeholder */}
        <div className="flex-1">

          <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-200 to-indigo-200 shadow-lg shadow-lg">

            <h2 className="text-2xl font-bold text-blue-600">
              Students Helping Students 🤝
            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}
