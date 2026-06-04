import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "JobHub helped me find my dream job in just 2 weeks. The platform is amazing!",
    },
    {
      name: "Michael T.",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Excellent platform with genuine job listings. Highly recommended for job seekers!",
    },
    {
      name: "Emily R.",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "I got multiple interview calls within days of applying. Great experience!",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Users Say
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Success stories from professionals who found
            opportunities through JobHub.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {testimonials.map((user) => (
            <div
              key={user.name}
              className="
                bg-white
                border
                border-gray-100
                rounded-2xl
                p-8
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Quote */}
              <FaQuoteLeft className="text-indigo-200 text-3xl mb-5" />

              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-500">
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
                <FiStar fill="currentColor" />
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-7">
                {user.review}
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">

                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {user.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {user.role}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;