"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


export default function ProfilePage() {


  const [profile, setProfile] = useState<any>(null);



  async function getProfile() {


    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;


    if(!user){
      alert("Please login first");
      return;
    }



    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();



    if(error){
      alert(error.message);
      return;
    }


    setProfile(data);


  }



  useEffect(()=>{

    getProfile();

  },[]);




  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6">


      <div className="max-w-4xl mx-auto">


        {/* Header */}

        <div className="bg-white/95 backdrop-blur rounded-3xl border border-white/20 shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-gray-900">
            👤 My Profile
          </h1>

          <p className="mt-3 text-gray-600 text-lg">
            View your SEF student account details.
          </p>

        </div>




        {profile && (

          <div className="mt-8 bg-white/95 backdrop-blur rounded-3xl border border-white/20 shadow-2xl p-8">


            {/* Profile Header */}

            <div className="flex items-center gap-5">


              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl">
                👨‍🎓
              </div>


              <div>

                <h2 className="text-3xl font-bold text-gray-900">
                  {profile.full_name}
                </h2>

                <p className="text-gray-500 mt-1">
                  SEF Student Member
                </p>

              </div>


            </div>




            {/* Details */}


            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">


              <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-100">

                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-semibold text-gray-900 mt-2">
                  {profile.email}
                </p>

              </div>




              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  College
                </p>

                <p className="font-semibold text-gray-900 mt-2">
                  {profile.college_name}
                </p>

              </div>




              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Student ID
                </p>

                <p className="font-semibold text-gray-900 mt-2">
                  {profile.student_id}
                </p>

              </div>




              <div className="bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Role
                </p>

                <p className="font-semibold text-blue-600 mt-2 capitalize">
                  {profile.role}
                </p>

              </div>



            </div>


          </div>

        )}



      </div>


    </main>

  );

}