"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [studentId, setStudentId] = useState("");

async function handleRegister() {

  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: undefined,
  },
});

  if (error) {
    alert(error.message);
    return;
  }


  const user = data.user;


  if (user) {

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
  id: user.id,
  full_name: fullName,
  college_name: collegeName,
  student_id: studentId,
  email: email,
  role: "student",
}
      ]);


    if (profileError) {
      alert(profileError.message);
      return;
    }

  }


  alert("Registration successful!");

}


  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">


      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl border border-gray-200">


        <div className="text-center">

          <h1 className="text-4xl font-extrabold text-gray-900">
            Join SEF
          </h1>

          <p className="mt-3 text-gray-500">
            Create your Students Emergency Fund account
          </p>

        </div>



        <div className="mt-8">


  <label className="text-sm font-semibold text-gray-700">
    Full Name
  </label>

  <input
    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    placeholder="Enter your full name"
    type="text"
    value={fullName}
    onChange={(e)=>setFullName(e.target.value)}
  />


  <label className="mt-5 block text-sm font-semibold text-gray-700">
    College Name
  </label>

  <input
    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    placeholder="Enter your college name"
    type="text"
    value={collegeName}
    onChange={(e)=>setCollegeName(e.target.value)}
  />


  <label className="mt-5 block text-sm font-semibold text-gray-700">
    Student ID
  </label>

  <input
    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    placeholder="Enter your student ID"
    type="text"
    value={studentId}
    onChange={(e)=>setStudentId(e.target.value)}
  />


  <label className="mt-5 block text-sm font-semibold text-gray-700">
    Email Address
  </label>

  <input
    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    placeholder="Enter your email"
    type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
  />


  <label className="mt-5 block text-sm font-semibold text-gray-700">
    Password
  </label>

  <input
    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    placeholder="Create password"
    type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
  />


  <button
    onClick={handleRegister}
    className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
  >
    Create Account
  </button>


</div>

      </div>


    </main>
  );
}