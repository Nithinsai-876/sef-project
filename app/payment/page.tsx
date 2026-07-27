"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";


export default function PaymentPage() {


  const [amount] = useState(100);



  async function submitPayment(){


    const { data } = await supabase.auth.getUser();

    const user = data.user;


    if(!user){
      alert("Please login first");
      return;
    }



    const { error } = await supabase
      .from("payments")
      .insert([
        {
          user_id:user.id,
          amount:amount,
          payment_month:"July 2026",
          status:"Pending"
        }
      ]);



    if(error){
      alert(error.message);
      return;
    }



    alert("Payment submitted. Verification pending!");

  }





  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 flex items-center justify-center p-6">


      <div className="w-full max-w-md">


        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 p-8 text-center">



          {/* Logo */}

          <div className="w-16 h-16 mx-auto bg-green-100 rounded-3xl flex items-center justify-center text-4xl">
            💳
          </div>




          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Monthly Contribution
          </h1>



          <p className="mt-3 text-gray-600">
            Support SEF by completing your monthly student contribution.
          </p>




          {/* Amount */}


          <div className="mt-6 bg-blue-50 rounded-2xl p-5">


            <p className="text-gray-500">
              Contribution Amount
            </p>


            <h2 className="text-4xl font-bold text-blue-700 mt-2">
              ₹100
            </h2>


            <p className="text-sm text-gray-500 mt-2">
              Monthly SEF contribution
            </p>


          </div>





          {/* QR Section */}


          <div className="mt-6">


            <p className="font-semibold text-gray-700 mb-3">
              Scan QR Code to Pay
            </p>


            <div className="h-52 bg-gray-100 rounded-3xl flex items-center justify-center border border-gray-200">


              <p className="text-gray-500">
                QR Code Here
              </p>


            </div>


          </div>





          <button

            onClick={submitPayment}

            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold shadow-lg transition"

          >

            Payment Done →

          </button>




        </div>


      </div>


    </main>

  );

}