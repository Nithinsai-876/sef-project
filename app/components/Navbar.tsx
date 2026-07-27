"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";


export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);


  useEffect(() => {

    async function checkUser() {

      const { data } = await supabase.auth.getUser();

      setUser(data.user);

    }

    checkUser();

  }, []);



  if (pathname === "/login" || pathname === "/register") {
    return null;
  }



  async function handleLogout() {

    await supabase.auth.signOut();

    setUser(null);

    router.push("/");

  }



  return (

    <nav className="bg-white shadow-md border-b px-8 py-4">

      <div className="max-w-6xl mx-auto flex items-center justify-between">


        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          SEF
        </h1>



        <div className="flex gap-6 items-center">


          {!user ? (

            <>

              <button
                className="text-gray-700 font-semibold hover:text-blue-600"
                onClick={() => router.push("/login")}
              >
                Login
              </button>


              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold"
                onClick={() => router.push("/register")}
              >
                Register
              </button>

            </>


          ) : (

            <>

              <button
                className="text-gray-700 font-semibold hover:text-blue-600"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>


              <button
                className="text-gray-700 font-semibold hover:text-blue-600"
                onClick={() => router.push("/profile")}
              >
                Profile
              </button>


              <button
                className="text-gray-700 font-semibold hover:text-blue-600"
                onClick={() => router.push("/my-requests")}
              >
                Requests
              </button>


              <button
                className="text-gray-700 font-semibold hover:text-blue-600"
                onClick={() => router.push("/my-payments")}
              >
                Payments
              </button>


              <button
                className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          )}


        </div>


      </div>

    </nav>

  );

}