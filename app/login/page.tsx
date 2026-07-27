"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";


export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogin() {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    alert(profileError.message);
    return;
  }

  alert("Login successful!");

  if (profile.role === "admin") {
    router.push("/admin");
  } else {
    router.push("/dashboard");
  }

}


  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">


      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl border">


        <h1 className="text-4xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>


        <p className="text-center text-gray-500 mt-3">
          Login to Students Emergency Fund
        </p>


        <input
  className="mt-8 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
  placeholder="Email"
  type="email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
/>


        <input
  className="mt-4 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
  placeholder="Password"
  type="password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
/>


        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
        >
          Login
        </button>


      </div>


    </main>

  );
}