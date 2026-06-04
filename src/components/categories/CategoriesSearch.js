import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function CategoriesSearch() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!category.trim()) return;

    navigate(`/jobs?category=${category}`);
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 flex-1 px-3 border border-gray-200 rounded-xl py-3 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiSearch className="text-gray-400" />

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Search categories..."
              className="w-full outline-none"
            />
          </div>

          <button
            onClick={handleSearch}
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSearch;