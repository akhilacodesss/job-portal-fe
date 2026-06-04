import {
  FiZap,
  FiTarget,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";

function WhyChooseUs() {
  const features = [
    {
      icon: <FiZap size={28} />,
      title: "Verified Jobs",
      description:
        "All jobs are verified and legitimate opportunities from trusted companies.",
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      icon: <FiTarget size={28} />,
      title: "Smart Matching",
      description:
        "Our AI matches you with jobs that fit your skills and experience.",
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure & Safe",
      description:
        "Your data is protected and we ensure a safe job search experience.",
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      icon: <FiHeadphones size={28} />,
      title: "24/7 Support",
      description:
        "Our support team is always here to help you at every step.",
      bg: "bg-pink-50",
      color: "text-pink-600",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose JobHub?
          </h2>

          <p className="text-gray-500 mt-3">
            We make your job search simple, faster and smarter.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-white
                rounded-2xl
                p-8
                text-center
                border
                border-gray-100
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div
                className={`
                  w-16 h-16
                  mx-auto
                  rounded-full
                  flex
                  items-center
                  justify-center
                  ${feature.bg}
                  ${feature.color}
                `}
              >
                {feature.icon}
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm leading-6 mt-3">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;