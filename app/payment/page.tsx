"use client";

import { FormEvent, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

type PaymentForm = {
  amount: string;
  paymentDate: string;
  paymentMonth: string;
  transactionId: string;
  payerName: string;
};

const emptyForm: PaymentForm = {
  amount: "100",
  paymentDate: "",
  paymentMonth: "",
  transactionId: "",
  payerName: "",
};

export default function PaymentPage() {
  const [step, setStep] = useState<"qr" | "details" | "complete">("qr");
  const [form, setForm] = useState<PaymentForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionId = useRef<string | null>(null);

  function updateForm(field: keyof PaymentForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function showDetails() {
    submissionId.current = crypto.randomUUID();
    setStep("details");
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      alert("Please login first");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("payments").insert({
      user_id: user.id,
      amount: Number(form.amount),
      payment_month: form.paymentMonth,
      payment_date: form.paymentDate,
      transaction_id: form.transactionId.trim(),
      payer_name: form.payerName.trim(),
      submission_id: submissionId.current ?? crypto.randomUUID(),
      status: "Pending",
    });

    if (error) {
      setIsSubmitting(false);
      alert(error.code === "23505" ? "This payment was already submitted." : error.message);
      return;
    }

    setForm(emptyForm);
    submissionId.current = null;
    setStep("complete");
    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/95 p-8 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-green-100 text-4xl">
            💳
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">Monthly Contribution</h1>
          <p className="mt-3 text-gray-600">Support SEF by completing your monthly student contribution.</p>

          {step === "qr" && (
            <>
              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-gray-500">Contribution Amount</p>
                <h2 className="mt-2 text-4xl font-bold text-blue-700">₹100</h2>
                <p className="mt-2 text-sm text-gray-500">Monthly SEF contribution</p>
              </div>

              <div className="mt-6">
                <p className="mb-3 font-semibold text-gray-700">Scan QR Code to Pay</p>
                <div className="flex h-52 items-center justify-center rounded-3xl border border-gray-200 bg-gray-100">
                  <p className="text-gray-500">QR Code Here</p>
                </div>
              </div>

              <button
                type="button"
                onClick={showDetails}
                className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700"
              >
                Next →
              </button>
            </>
          )}

          {step === "details" && (
            <form onSubmit={submitPayment} className="mt-7 space-y-4 text-left">
              <p className="text-center font-semibold text-gray-700">Enter your payment details</p>

              <label className="block text-sm font-semibold text-gray-700">
                Name
                <input required value={form.payerName} onChange={(event) => updateForm("payerName", event.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3" />
              </label>

              <label className="block text-sm font-semibold text-gray-700">
                Amount paid (₹)
                <input required min="1" step="0.01" type="number" value={form.amount} onChange={(event) => updateForm("amount", event.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3" />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Payment date
                  <input required type="date" value={form.paymentDate} onChange={(event) => updateForm("paymentDate", event.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3" />
                </label>

                <label className="block text-sm font-semibold text-gray-700">
                  Payment month
                  <input required type="month" value={form.paymentMonth} onChange={(event) => updateForm("paymentMonth", event.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3" />
                </label>
              </div>

              <label className="block text-sm font-semibold text-gray-700">
                Payment transaction ID
                <input required value={form.transactionId} onChange={(event) => updateForm("transactionId", event.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3" />
              </label>

              <button disabled={isSubmitting} className="w-full rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400">
                {isSubmitting ? "Submitting payment..." : "Payment Done →"}
              </button>
            </form>
          )}

          {step === "complete" && (
            <div className="mt-8 rounded-2xl bg-green-50 p-6 text-green-800">
              <p className="text-lg font-bold">Payment submitted once</p>
              <p className="mt-2 text-sm">Your details were sent for admin verification.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
