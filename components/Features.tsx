export default function Features() {
  const features = [
    {
      title: "Emergency Support",
      description:
        "Students can request financial assistance during emergency situations."
    },
    {
      title: "Monthly Contribution",
      description:
        "Every student contributes monthly to create a strong support system."
    },
    {
      title: "Transparent Process",
      description:
        "Every request and contribution is verified through an organized process."
    }
  ];

  return (
    <section id="features" className="px-8 py-20">

      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          How SEF Helps Students
        </h2>

        <p className="mt-4 text-center text-gray-600">
          A simple platform built by students, for students.
        </p>


        <div className="mt-12 grid gap-8 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >

              <h3 className="text-2xl font-bold text-blue-600">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}