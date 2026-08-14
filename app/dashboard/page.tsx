"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";


export default function Dashboard() {

  const router = useRouter();

  async function handleLogout(){

    await supabase.auth.signOut();

    router.push("/login");

  }


  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6">


      <div className="max-w-6xl mx-auto">


        {/* Header */}

        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 p-8">


          <h1 className="text-4xl font-bold text-gray-900">
            🏦 Student Emergency Fund
          </h1>


          <p className="mt-3 text-gray-600 text-lg">
            A trusted support system helping students during unexpected emergencies.
          </p>


          <button
            className="mt-6 bg-red-600/90 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>



        {/* Feature Cards */}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">



          <div className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 p-7 shadow-xl hover:-translate-y-1 transition">


            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl">
              💰
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              Emergency Fund
            </h2>


            <p className="mt-3 text-gray-600">
              Request financial support during emergencies.
            </p>


            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={() => router.push("/request")}
            >
              Request Fund →
            </button>


          </div>





          <div className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 p-7 shadow-xl hover:-translate-y-1 transition">


            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
              💳
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              Monthly Contribution
            </h2>


            <p className="mt-3 text-gray-600">
              Pay your monthly SEF contribution.
            </p>


            <button
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={() => router.push("/payment")}
            >
              Pay Now →
            </button>


          </div>





          <div className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 p-7 shadow-xl hover:-translate-y-1 transition">


            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
              📄
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              My Requests
            </h2>


            <p className="mt-3 text-gray-600">
              Track your emergency fund request status.
            </p>


            <button
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={() => router.push("/my-requests")}
            >
              View Requests →
            </button>


          </div>





          <div className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 p-7 shadow-xl hover:-translate-y-1 transition">


            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
              💵
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              My Payments
            </h2>


            <p className="mt-3 text-gray-600">
              View your monthly contribution history.
            </p>


            <button
              className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={() => router.push("/my-payments")}
            >
              Payment History →
            </button>


          </div>





          <div 
          className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 p-7 shadow-xl hover:-translate-y-1 transition">


            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
              👤
            </div>


            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              My Profile
            </h2>


            <p className="mt-3 text-gray-600">
              View your student details and profile information.
            </p>


            <button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={() => router.push("/profile")}
            >
              Open Profile →
            </button>


          </div>



        </div>


      </div>


    </main>

  );

}
