"use client";

import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";


export default function Navbar() {

  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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

    <nav className="border-b bg-white px-4 py-3 shadow-md sm:px-8 sm:py-4">

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">


        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          SEF
        </h1>



        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">


          {!user ? (

            <>

              <button
                className="px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:text-base"
                onClick={() => router.push("/login")}
              >
                Login
              </button>


              <button
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white sm:px-4 sm:text-base"
                onClick={() => router.push("/register")}
              >
                Register
              </button>

            </>


          ) : (

            <>

              <button
                className="px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:text-base"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </button>


              <button
                className="px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:text-base"
                onClick={() => router.push("/profile")}
              >
                Profile
              </button>


              <button
                className="px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:text-base"
                onClick={() => router.push("/my-requests")}
              >
                Requests
              </button>


              <button
                className="px-2 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:text-base"
                onClick={() => router.push("/my-payments")}
              >
                Payments
              </button>


              <button
                className="rounded-xl bg-red-600 px-3 py-2 text-sm font-bold text-white sm:px-4 sm:text-base"
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
