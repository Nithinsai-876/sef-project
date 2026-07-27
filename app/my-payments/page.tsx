"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


export default function MyPayments() {


  const [payments, setPayments] = useState<any[]>([]);



  async function getMyPayments() {


    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;


    if(!user){
      alert("Please login first");
      return;
    }



    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id);



    if(error){
      alert(error.message);
      return;
    }


    setPayments(data || []);


  }



  useEffect(()=>{

    getMyPayments();

  },[]);





  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6">


      <div className="max-w-4xl mx-auto">


        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 p-8">



          {/* Header */}


          <div className="flex items-center gap-4">


            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl">
              💳
            </div>


            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                My Payments
              </h1>


              <p className="text-gray-600 mt-1">
                View your monthly SEF contribution history
              </p>

            </div>


          </div>





          <div className="mt-8 space-y-5">



            {payments.length === 0 && (

              <div className="bg-blue-50 rounded-3xl p-6 text-center text-gray-600">

                No payment history found.

              </div>

            )}





            {payments.map((payment)=>(


              <div

                key={payment.id}

                className="bg-blue-50/70 rounded-3xl border border-blue-100 p-6 hover:shadow-lg transition"

              >



                <div className="flex justify-between items-center flex-wrap gap-4">


                  <div>

                    <p className="text-gray-500 text-sm">
                      Contribution Amount
                    </p>


                    <h2 className="text-3xl font-bold text-blue-700 mt-1">
                      ₹{payment.amount}
                    </h2>


                  </div>





                  <span

                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      payment.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}

                  >

                    {payment.status}

                  </span>



                </div>




                <div className="mt-5">


                  <p className="text-gray-500 text-sm">
                    Payment Month
                  </p>


                  <p className="mt-1 text-gray-900 font-semibold">
                    {payment.payment_month}
                  </p>


                </div>



              </div>


            ))}




          </div>



        </div>



      </div>



    </main>

  );

}