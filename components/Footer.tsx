export default function Footer() {
  return (
    <footer className="bg-gray-900 px-8 py-12 text-white">

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            SEF
          </h2>

          <p className="mt-3 max-w-sm text-gray-400">
            Students Emergency Fund is a community-driven platform
            helping students support each other during emergencies.
          </p>
        </div>


        <div>
          <h3 className="font-semibold">
            Contact
          </h3>

          <p className="mt-3 text-gray-400">
            Email: sef@example.com
          </p>

          <p className="mt-2 text-gray-400">
            Students Helping Students
          </p>
        </div>


      </div>


      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-700 pt-6 text-center text-gray-500">

        © 2026 Students Emergency Fund. All rights reserved.

      </div>

    </footer>
  );
}