import { useEffect, useState } from "react";
import {
  FiCode,
  FiSend,
  FiBarChart2,
  FiDollarSign,
  FiUsers,
  FiHeadphones,
  FiBriefcase,
} from "react-icons/fi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { Link } from "react-router-dom";

const categoryIcons = {
  Development: {
    icon: <FiCode size={24} />,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  Design: {
    icon: <HiOutlinePaintBrush size={24} />,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  Marketing: {
    icon: <FiSend size={24} />,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  "Data Science": {
    icon: <FiBarChart2 size={24} />,
    bg: "bg-indigo-50",
    color: "text-indigo-500",
  },
  Finance: {
    icon: <FiDollarSign size={24} />,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  "Human Resources": {
    icon: <FiUsers size={24} />,
    bg: "bg-pink-50",
    color: "text-pink-500",
  },
  "Customer Support": {
    icon: <FiHeadphones size={24} />,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  Business: {
    icon: <FiBriefcase size={24} />,
    bg: "bg-indigo-50",
    color: "text-indigo-500",
  },
};

function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}jobs/categories`
        );

        const data = await res.json();

        setCategories((data.categories || []).slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Categories
            </h2>

            <p className="text-gray-500 mt-2">
              Explore opportunities across the most in-demand industries.
            </p>
          </div>

          <Link
            to="/categories"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
          >
            Browse All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryData =
              categoryIcons[category._id] || {
                icon: <FiBriefcase size={24} />,
                bg: "bg-indigo-50",
                color: "text-indigo-500",
              };

            return (
              <Link
                key={category._id}
                to={`/jobs?category=${encodeURIComponent(
                  category._id
                )}`}
                className="
                  bg-white
                  rounded-2xl
                  p-6
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
                    w-14 h-14
                    mx-auto
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${categoryData.bg}
                    ${categoryData.color}
                  `}
                >
                  {categoryData.icon}
                </div>

                <h3 className="font-semibold mt-4 text-gray-800">
                  {category._id}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {category.count} Jobs
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;