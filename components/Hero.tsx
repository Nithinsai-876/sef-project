export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white">

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-8 py-24 md:flex-row">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Helping Students
            <span className="text-blue-600">
              {" "}During Emergencies
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            A student-driven emergency fund platform where
            every contribution creates support for students
            when they need it the most.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
              Login
            </button>

            <button className="rounded-xl border border-gray-300 px-8 py-3 font-semibold hover:bg-gray-100">
              Learn More
            </button>

          </div>

        </div>


        {/* Right Illustration Placeholder */}
        <div className="flex-1">

          <div className="flex h-80 items-center justify-center rounded-3xl bg-blue-100">

            <h2 className="text-2xl font-bold text-blue-600">
              Students Helping Students 🤝
            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}