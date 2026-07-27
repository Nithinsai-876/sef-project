export default function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Students Joined",
    },
    {
      number: "₹50,000+",
      title: "Funds Collected",
    },
    {
      number: "100+",
      title: "Students Supported",
    },
  ];

  return (
    <section className="bg-blue-600 px-8 py-20">

      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-4xl font-bold text-white">
          Our Impact
        </h2>


        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl bg-white p-8 text-center"
            >

              <h3 className="text-4xl font-extrabold text-blue-600">
                {stat.number}
              </h3>

              <p className="mt-3 text-lg text-gray-600">
                {stat.title}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}