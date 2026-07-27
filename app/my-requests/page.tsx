"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


export default function MyRequests() {


  const [requests, setRequests] = useState<any[]>([]);



  async function getMyRequests() {

    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;


    if (!user) {
      alert("Please login first");
      return;
    }



    const { data, error } = await supabase
  .from("fund_requests")
  .select("*")
  .eq("user_id", user.id);


    if(error){
      alert(error.message);
      return;
    }



    setRequests(data || []);

  }




  useEffect(() => {
    getMyRequests();
  }, []);





  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6">


      <div className="max-w-4xl mx-auto">



        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl border border-white/20 p-8">


          <div className="flex items-center gap-4">


            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
              📄
            </div>


            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                My Fund Requests
              </h1>


              <p className="text-gray-600 mt-1">
                Track your emergency fund request status
              </p>

            </div>


          </div>




          <div className="mt-8 space-y-5">



            {requests.length === 0 && (

              <div className="text-center py-10 text-gray-500">
                No fund requests submitted yet.
              </div>

            )}





            {requests.map((request)=>(



              <div
                key={request.id}
                className="bg-blue-50/70 rounded-3xl border border-blue-100 p-6 hover:shadow-lg transition"
              >



                <div className="flex justify-between items-center flex-wrap gap-4">


                  <h2 className="text-2xl font-bold text-gray-900">
                    ₹{request.amount}
                  </h2>



                  <span

                    className={`px-4 py-2 rounded-full font-semibold text-sm
                    ${
                      request.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : request.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}

                  >

                    {request.status}

                  </span>


                </div>




                <div className="mt-5">


                  <p className="text-gray-500 text-sm">
                    Emergency Reason
                  </p>


                  <p className="mt-2 text-gray-800">
                    {request.reason}
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