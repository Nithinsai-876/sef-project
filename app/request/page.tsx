"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";


export default function RequestFund() {

  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");


  async function submitRequest() {

    const { data } = await supabase.auth.getUser();

    const user = data.user;


    if (!user) {
      alert("Please login first");
      return;
    }


    const { error } = await supabase
      .from("fund_requests")
      .insert([
        {
          user_id: user.id,
          reason: reason,
          amount: amount,
          status: "Pending",
        }
      ]);


    if (error) {
      alert(error.message);
      return;
    }


    alert("Fund request submitted successfully!");

    setReason("");
    setAmount("");

  }



 return (

  <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 flex items-center justify-center p-6">


    <div className="w-full max-w-xl">


      <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 border border-white/20">


        {/* SEF Branding */}

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-4xl shadow-lg">
            🏦
          </div>


          <div>

            <h2 className="text-blue-700 font-bold text-lg">
              SEF
            </h2>

            <p className="text-gray-500 text-sm">
              Student Emergency Fund
            </p>

          </div>


        </div>




        <h1 className="text-3xl font-bold text-gray-900 mt-8">
          Request Emergency Support
        </h1>


        <p className="mt-3 text-gray-600">
          Tell us your emergency situation. SEF helps students during difficult times.
        </p>




        <div className="mt-8">


          <label className="text-sm font-semibold text-gray-700">
            Emergency Reason
          </label>


          <textarea

            className="mt-2 w-full rounded-2xl border border-gray-300 bg-gray-50 p-4 text-gray-900 outline-none focus:border-blue-600"

            placeholder="Explain your emergency situation..."

            rows={5}

            value={reason}

            onChange={(e)=>setReason(e.target.value)}

          />




          <label className="block mt-5 text-sm font-semibold text-gray-700">
            Required Amount
          </label>



          <div className="relative mt-2">

            <span className="absolute left-4 top-3 text-blue-700 font-bold">
              ₹
            </span>


            <input

              className="w-full rounded-2xl border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 outline-none focus:border-blue-600"

              placeholder="Enter required amount"

              type="number"

              value={amount}

              onChange={(e)=>setAmount(e.target.value)}

            />

          </div>





          <button

            onClick={submitRequest}

            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition"

          >

            Submit Request →

          </button>



        </div>



      </div>



    </div>



  </main>

);
}