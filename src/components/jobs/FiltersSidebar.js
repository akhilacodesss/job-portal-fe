import { FiFilter, FiChevronDown } from "react-icons/fi";

function FiltersSidebar({
  jobType,
  setJobType,
  experience,
  setExperience,
  salary,
  setSalary,
  location,
  setLocation,
}) {
  function clearFilters() {
    setJobType("");
    setExperience("");
    setSalary("");
    setLocation("");
  }

  return (
    <aside className="bg-white border border-gray-100 rounded-2xl p-6 h-fit shadow-sm">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiFilter className="text-indigo-600" />
          <h3 className="font-semibold text-lg">
            Filters
          </h3>
        </div>

        <button
          onClick={clearFilters}
          className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition"
        >
          Clear All
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Job Type</h4>
          <FiChevronDown />
        </div>

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="border-t border-gray-100 pt-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Experience</h4>
          <FiChevronDown />
        </div>

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
      </div>

      <div className="border-t border-gray-100 pt-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Salary</h4>
          <FiChevronDown />
        </div>

        <input
          type="range"
          min="0"
          max="50"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full accent-indigo-600"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-2">
  <span>₹0</span>
  <span>
    {salary ? `₹${salary} LPA` : "Any Salary"}
  </span>
</div>
      </div>

      <div className="border-t border-gray-100 pt-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Location</h4>
          <FiChevronDown />
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search location..."
          className="
            w-full
            border
            border-gray-200
            rounded-lg
            px-3
            py-2
            text-sm
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />
      </div>

    </aside>
  );
}

export default FiltersSidebar;