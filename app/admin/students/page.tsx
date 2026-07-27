"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function StudentsPage() {

  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function getStudents() {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("student_id", { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    setStudents(data || []);
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

    getStudents();

  }

  checkAdmin();

}, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900">
          Student Management
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage all registered students.
        </p>

        <input
          type="text"
          placeholder="Search by Name, Student ID or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-8 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
        />

        <div className="mt-8 bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Student ID
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  College
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

              </tr>

            </thead>

            <tbody>

              {students
                .filter((student) => {

                  const keyword = search.toLowerCase();

                  return (
                    student.full_name?.toLowerCase().includes(keyword) ||
                    student.student_id?.toLowerCase().includes(keyword) ||
                    student.email?.toLowerCase().includes(keyword)
                  );

                })
                .map((student) => (

                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 text-gray-900">
                      {student.full_name}
                    </td>

                    <td className="p-4 text-gray-700">
                      {student.student_id}
                    </td>

                    <td className="p-4 text-gray-700">
                      {student.email}
                    </td>

                    <td className="p-4 text-gray-700">
                      {student.college_name}
                    </td>

                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                        {student.role}

                      </span>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );

}