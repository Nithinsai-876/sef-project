"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";


export default function AdminPayments() {

  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);



  async function getPayments(){

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("status", "Pending");


    if(error){
      alert(error.message);
      return;
    }


    setPayments(data || []);

  }



 useEffect(() => {

  async function checkAdmin() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      alert("Access Denied!");
      router.push("/dashboard");
      return;
    }

    getPayments();

  }

  checkAdmin();

}, []);




  return (

    <main className="min-h-screen bg-gray-100 p-8">


      <div className="max-w-5xl mx-auto">


        <h1 className="text-4xl font-bold text-gray-900">
          Admin Payment Verification
        </h1>


        <p className="mt-2 text-gray-600">
          Verify student monthly contributions
        </p>



        <div className="mt-8 space-y-5">


        {payments.map((payment)=>(


          <div
            key={payment.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
          >


            <h2 className="text-xl font-bold text-gray-900">
              Amount: ₹{payment.amount}
            </h2>


            <p className="mt-3 text-gray-700">
              Month: {payment.payment_month}
            </p>


            <p className="mt-3 font-semibold text-gray-900">
              Status: {payment.status}
            </p>



            <div className="mt-5 flex gap-4">


              <button
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold"
  onClick={async()=>{

    const { error } = await supabase
      .from("payments")
      .update({
        status:"Approved"
      })
      .eq("id", payment.id);



    if(error){

      alert(error.message);

    }
    else{

      alert("Payment Approved");

      await getPayments();

    }


  }}
>
  Approve
</button>




              <button
                className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold"
                onClick={async()=>{


                  const { error } = await supabase
                    .from("payments")
                    .update({status:"Rejected"})
                    .eq("id", payment.id);



                  if(error){
                    alert(error.message);
                  }
                  else{
                    alert("Payment Rejected");
                    getPayments();
                  }


                }}
              >
                Reject
              </button>



            </div>



          </div>


        ))}



        </div>


      </div>


    </main>

  );

}