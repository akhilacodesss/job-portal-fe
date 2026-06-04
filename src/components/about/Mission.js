import { FiCheckCircle } from "react-icons/fi";

function Mission() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="max-w-4xl mx-auto text-center">

          <span
            className="
              inline-block
              bg-indigo-100
              text-indigo-600
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
          >
            Our Mission
          </span>

          <h2 className="text-4xl font-bold mt-6">
            Simplifying Hiring &
            <span className="text-indigo-600">
              {" "}Empowering Careers
            </span>
          </h2>

          <p className="text-gray-600 text-lg mt-6 leading-8">
            At JobHub, our mission is to bridge the gap between talented
            professionals and great companies. We believe everyone deserves
            access to meaningful career opportunities, and every employer
            deserves access to exceptional talent.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <div className="bg-slate-50 rounded-2xl p-6">
            <FiCheckCircle
              size={28}
              className="text-indigo-600 mb-4"
            />

            <h3 className="font-semibold text-lg">
              Connect Talent
            </h3>

            <p className="text-gray-600 mt-3">
              Helping skilled professionals discover
              opportunities that match their goals.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <FiCheckCircle
              size={28}
              className="text-indigo-600 mb-4"
            />

            <h3 className="font-semibold text-lg">
              Support Employers
            </h3>

            <p className="text-gray-600 mt-3">
              Making recruitment easier by connecting
              companies with qualified candidates.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <FiCheckCircle
              size={28}
              className="text-indigo-600 mb-4"
            />

            <h3 className="font-semibold text-lg">
              Drive Growth
            </h3>

            <p className="text-gray-600 mt-3">
              Creating opportunities that help both
              businesses and professionals succeed.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Mission;