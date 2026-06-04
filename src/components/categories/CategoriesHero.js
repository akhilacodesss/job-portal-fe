import CategoriesSearch from "./CategoriesSearch";
import categoryHero from "../../assets/category-hero.png";

function CategoriesHero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto  px-2 py-6 md:py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>

            <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
              Explore Opportunities
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
              Browse Job
              <br />
              <span className="text-indigo-600">
                Categories
              </span>
            </h1>

            <p className="text-gray-600 mt-5 text-lg max-w-xl">
              Explore opportunities across different industries
              and find the perfect role for your career.
            </p>

            {/* Stats Chips */}
            <div className="flex flex-wrap gap-3 mt-8">

              <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-medium">
                📂 10+ Categories
              </div>

              <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-medium">
                💼 25K+ Jobs
              </div>

              <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-medium">
                🏢 10K+ Companies
              </div>

            </div>

            {/* Search */}
            <div className="max-w-xl mt-8">
              <CategoriesSearch />
            </div>

          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">

            <img
              src={categoryHero}
              alt="Browse Categories"
              className="w-full max-w-sm lg:max-w-lg"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default CategoriesHero;