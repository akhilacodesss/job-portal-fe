import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

function JobsSearchBar({
  keyword,
  setKeyword,
  location,
  setLocation,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">

      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center gap-3 flex-1 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <FiSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search by job title, keyword or company"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center gap-3 flex-1 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <IoLocationOutline className="text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition">
          Search Jobs
        </button>

      </div>

    </div>
  );
}

export default JobsSearchBar;