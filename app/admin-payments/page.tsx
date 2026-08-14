"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Payment = {
  id: string;
  amount: number;
  payment_month: string;
  payment_date: string;
  transaction_id: string;
  payer_name: string;
  status: string;
};

export default function AdminPayments() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function getPayments() {
    const { data, error } = await supabase.from("payments").select("*").eq("status", "Pending");

    if (error) {
      alert(error.message);
      return;
    }

    setPayments((data as Payment[]) || []);
  }

  async function updatePaymentStatus(id: string, status: "Approved" | "Rejected") {
    if (updatingId) return;

    setUpdatingId(id);
    const { error } = await supabase.from("payments").update({ status }).eq("id", id);
    setUpdatingId(null);

    if (error) {
      alert(error.message);
      return;
    }

    await getPayments();
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

      if (profile?.role !== "admin") {
        alert("Access Denied!");
        router.push("/dashboard");
        return;
      }

      getPayments();
    }

    checkAdmin();
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-100 p-5 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Admin Payment Verification</h1>
        <p className="mt-2 text-gray-600">Verify student monthly contributions</p>

        <div className="mt-8 space-y-5">
          {payments.length === 0 && <p className="rounded-2xl bg-white p-6 text-gray-600 shadow">No pending payments.</p>}

          {payments.map((payment) => (
            <div key={payment.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{payment.payer_name}</h2>
                  <p className="mt-1 text-gray-600">Amount: ₹{payment.amount}</p>
                </div>
                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">{payment.status}</span>
              </div>

              <dl className="mt-5 grid gap-4 rounded-xl bg-gray-50 p-4 text-sm sm:grid-cols-2">
                <div><dt className="text-gray-500">Payment month</dt><dd className="font-semibold text-gray-900">{payment.payment_month}</dd></div>
                <div><dt className="text-gray-500">Payment date</dt><dd className="font-semibold text-gray-900">{payment.payment_date}</dd></div>
                <div className="sm:col-span-2"><dt className="text-gray-500">Transaction ID</dt><dd className="break-all font-semibold text-gray-900">{payment.transaction_id}</dd></div>
              </dl>

              <div className="mt-5 flex gap-3">
                <button disabled={updatingId === payment.id} onClick={() => updatePaymentStatus(payment.id, "Approved")} className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 disabled:bg-green-400">Approve</button>
                <button disabled={updatingId === payment.id} onClick={() => updatePaymentStatus(payment.id, "Rejected")} className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 disabled:bg-red-400">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
