import { Link } from "react-router-dom";

function TopCompanies() {
  const companies = [
    {
      name: "Google",
      logo: "https://cdn.simpleicons.org/google",
      jobs: 125,
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      jobs: 98,
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      jobs: 156,
    },
    {
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
      jobs: 64,
    },
    {
      name: "Airbnb",
      logo: "https://cdn.simpleicons.org/airbnb",
      jobs: 41,
    },
    {
      name: "Spotify",
      logo: "https://cdn.simpleicons.org/spotify",
      jobs: 52,
    },
    {
      name: "Meta",
      logo: "https://cdn.simpleicons.org/meta",
      jobs: 118,
    },
    {
      name: "Uber",
      logo: "https://cdn.simpleicons.org/uber",
      jobs: 73,
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Top Companies
            </h2>

            <p className="text-gray-500 mt-2">
              Explore opportunities from leading global companies.
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
          >
            View All Companies →
          </Link>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">

          {companies.map((company) => (
            <div
              key={company.name}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-6
                text-center
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
              "
            >
              <div className="h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-10 object-contain"
                />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                {company.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {company.jobs} Open Positions
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TopCompanies;