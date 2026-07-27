"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase";



export default function AdminDashboard() {

  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
  totalStudents: 0,
  totalRequests: 0,
  approved: 0,
  pending: 0,
  rejected: 0,
  totalPayments: 0,
  totalCollected: 0,
  totalDistributed: 0,
  balance: 0,
});


  async function getRequests() {


    const { data, error } = await supabase
  .from("fund_requests")
  .select(`
    *,
    profiles (
      full_name,
      email,
      student_id,
      college_name
    )
  `);

console.log(data);
console.log(error);


    if(error){
      alert(error.message);
      return;
    }


    setRequests(data || []);
          // Total Requests
      const totalRequests = data?.length || 0;

      // Approved Requests
      const approved =
        data?.filter((item) => item.status === "Approved").length || 0;

      // Pending Requests
      const pending =
        data?.filter((item) => item.status === "Pending").length || 0;

      // Rejected Requests
      const rejected =
        data?.filter((item) => item.status === "Rejected").length || 0;


      // Total Students
      const { count: totalStudents } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });


      // Total Payments
      const { count: totalPayments } = await supabase
        .from("payments")
        .select("*", { count: "exact", head: true });

        // Total Approved Contributions

const { data: payments } = await supabase
  .from("payments")
  .select("amount")
  .eq("status", "Approved");


const totalCollected = payments?.reduce(
  (sum, item) => sum + Number(item.amount),
  0
) || 0;



// Total Approved Fund Distribution

const { data: approvedRequests } = await supabase
  .from("fund_requests")
  .select("amount")
  .eq("status", "Approved");


const totalDistributed = approvedRequests?.reduce(
  (sum, item) => sum + Number(item.amount),
  0
) || 0;



const balance = totalCollected - totalDistributed;


      setStats({
  totalStudents: totalStudents || 0,
  totalRequests,
  approved,
  pending,
  rejected,
  totalPayments: totalPayments || 0,
  totalCollected,
  totalDistributed,
  balance,
});

  }


  useEffect(() => {

  async function checkAdmin() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      alert(error.message);
      router.push("/login");
      return;
    }

    if (profile.role !== "admin") {
      alert("Access Denied!");
      router.push("/dashboard");
      return;
    }

    getRequests();

  }

  checkAdmin();

}, []);


  return (

    <main className="min-h-screen bg-gray-100 p-8">


      <div className="max-w-5xl mx-auto">


        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200">

  <h1 className="text-4xl font-bold text-gray-900">
    🏦 SEF Admin Dashboard
  </h1>

  <p className="mt-3 text-gray-600 text-lg">
    Manage student emergency fund requests, payments and students.
  </p>

</div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">


  <button
    onClick={() => router.push("/admin/students")}
    className="bg-white border border-gray-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-xl transition"
  >

    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
      👨‍🎓
    </div>

    <h2 className="text-lg font-bold text-gray-900 mt-2">
      Students
    </h2>

    <p className="text-gray-600 mt-2">
      Manage registered students
    </p>

    <p className="text-blue-600 font-semibold mt-4">
      Open →
    </p>

  </button>



  <button
    onClick={() => router.push("/admin-payments")}
    className="bg-white border border-gray-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-xl transition"
  >

    <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
      💳
    </div>

    <h2 className="text-xl font-bold text-gray-900 mt-5">
      Payments
    </h2>

    <p className="text-gray-600 mt-2">
      Verify student contributions
    </p>

    <p className="text-green-600 font-semibold mt-4">
      Open →
    </p>

  </button>



  <button
    onClick={() => router.push("/dashboard")}
    className="bg-white border border-gray-200 rounded-3xl p-6 text-left shadow-sm hover:shadow-xl transition"
  >

    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
      👤
    </div>

    <h2 className="text-xl font-bold text-gray-900 mt-5">
      Student View
    </h2>

    <p className="text-gray-600 mt-2">
      Preview student experience
    </p>

    <p className="text-purple-600 font-semibold mt-4">
      Open →
    </p>

  </button>


</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

    <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
      💰
    </div>

    <p className="text-gray-500 mt-5">
      Total Collected
    </p>

    <h2
className={`text-4xl font-bold mt-2 ${
  stats.balance < 0
  ? "text-red-600"
  : "text-green-600"
}`}
>
  ₹{stats.totalCollected}
</h2>

    <p className="text-green-600 mt-3 font-semibold">
      Approved contributions
    </p>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
      💸
    </div>

    <p className="text-gray-500 mt-5">
      Total Distributed
    </p>

    <h2 className="text-4xl font-bold text-gray-900 mt-2">
      ₹{stats.totalDistributed}
    </h2>

    <p className="text-red-600 mt-3 font-semibold">
      Approved emergency support
    </p>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
      🏦
    </div>

    <p className="text-gray-500 mt-5">
      Current Balance
    </p>

    <h2 className="text-4xl font-bold text-blue-700 mt-2">
      ₹{stats.balance}
    </h2>

    <p className="text-blue-600 mt-3 font-semibold">
      Available emergency fund
    </p>

  </div>


</div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      👨‍🎓 Total Students
    </p>

    <h2 className="text-4xl font-bold text-gray-900 mt-3">
      {stats.totalStudents}
    </h2>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      📄 Total Requests
    </p>

    <h2 className="text-4xl font-bold text-gray-900 mt-3">
      {stats.totalRequests}
    </h2>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      ✅ Approved Requests
    </p>

    <h2 className="text-4xl font-bold text-green-600 mt-3">
      {stats.approved}
    </h2>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      ⏳ Pending Requests
    </p>

    <h2 className="text-4xl font-bold text-yellow-600 mt-3">
      {stats.pending}
    </h2>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      ❌ Rejected Requests
    </p>

    <h2 className="text-4xl font-bold text-red-600 mt-3">
      {stats.rejected}
    </h2>

  </div>



  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">

    <p className="text-gray-500">
      💳 Total Payments
    </p>

    <h2 className="text-4xl font-bold text-blue-600 mt-3">
      {stats.totalPayments}
    </h2>

  </div>


</div>

              <div className="flex gap-3 mt-8 flex-wrap">

        <button
          onClick={() => setFilter("All")}
          className="bg-gray-700 text-white px-4 py-2 rounded-xl"
        >
          All
        </button>

        <button
          onClick={() => setFilter("Pending")}
          className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("Approved")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Approved
        </button>

        <button
          onClick={() => setFilter("Rejected")}
          className="bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Rejected
        </button>

              <input
        type="text"
        placeholder="Search by Name, Student ID or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
      />

      </div>
        <div className="mt-4 space-y-2">

{requests
  .filter((request) => {
    if (filter !== "All" && request.status !== filter) {
      return false;
    }

    const keyword = search.toLowerCase();

    return (
      request.profiles?.full_name?.toLowerCase().includes(keyword) ||
      request.profiles?.student_id?.toLowerCase().includes(keyword) ||
      request.profiles?.email?.toLowerCase().includes(keyword)
    );
  })
  .map((request) => (
          
          <div 
  key={request.id}
  className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-start flex-wrap gap-2">

  <div>

    <h2 className="text-lg font-bold text-gray-900">
      {request.profiles?.full_name}
    </h2>

    <p className="text-gray-500 mt-1">
      {request.profiles?.email}
    </p>

  </div>

  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
    {request.status}
  </span>

</div>

<p className="text-gray-700 text-sm">
  {request.profiles?.email} | {request.profiles?.student_id}
</p>

<hr className="my-3" />

<div className="mt-3 bg-blue-50 rounded-xl p-3">

  <p className="text-gray-500 text-sm">
    Requested Amount
  </p>

  <p className="text-2xl font-bold text-blue-700 mt-1">
    ₹{request.amount}
  </p>

</div>

<div className="mt-2">

  <p className="text-gray-500 text-sm">
    Reason
  </p>

  <p className="mt-1 text-sm text-gray-800">
  📝 {request.reason}
</p>

</div>

<p className="mt-1 text-sm font-semibold text-indigo-700">
  📌 Status: {request.status}
</p>
            <div className="mt-3 flex gap-3 flex-wrap">

  <button
  disabled={request.status !== "Pending"}
  className={`px-4 py-2 rounded-xl font-semibold text-white transition ${
    request.status !== "Pending"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
  onClick={async()=>{

    if(request.status !== "Pending"){
      alert("This request is already processed!");
      return;
    }


    const { error: requestError } = await supabase
  .from("fund_requests")
  .update({
    status: "Approved"
  })
  .eq("id", request.id);


if(requestError){
  alert(requestError.message);
  return;
}


// Add distribution history
const { error: distributionError } = await supabase
  .from("fund_distributions")
  .insert({
    request_id: request.id,
    user_id: request.user_id,
    amount: request.amount,
    status: "Approved"
  });


if(distributionError){
  alert(distributionError.message);
  return;
}
alert("Request Approved");

await getRequests();

  }}
>
  {request.status === "Approved" ? "Approved" : "Approve"}
</button>

  <button
  disabled={request.status !== "Pending"}
  className={`px-4 py-2 rounded-xl font-semibold text-white transition ${
    request.status !== "Pending"
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
  onClick={async()=>{

    if(request.status !== "Pending"){
      alert("This request is already processed!");
      return;
    }

    const { error } = await supabase
      .from("fund_requests")
      .update({
        status:"Rejected"
      })
      .eq("id", request.id);


    if(error){
      alert(error.message);
    }
    else{
      alert("Request Rejected");
      await getRequests();
    }

  }}
>
  {request.status === "Rejected" ? "Rejected" : "Reject"}
</button>
</div>


          </div>

        ))}


        </div>


      </div>


    </main>

  );

}