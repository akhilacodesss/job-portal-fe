import { useEffect, useState } from "react";
import {
  FiCode,
  FiPenTool,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2,
  FiUsers,
  FiShoppingBag,
  FiHeadphones,
  FiShield,
  FiShoppingCart,
  FiBriefcase
} from "react-icons/fi";

import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const categoryIcons = {
  Development: <FiCode size={24} />,
  Design: <FiPenTool size={24} />,
  Marketing: <FiTrendingUp size={24} />,
  Finance: <FiDollarSign size={24} />,
  "Data Science": <FiBarChart2 size={24} />,
  "Human Resources": <FiUsers size={24} />,
  Business: <FiShoppingBag size={24} />,
  "Customer Support": <FiHeadphones size={24} />,
  "Cyber Security": <FiShield size={24} />,
  Sales: <FiShoppingCart size={24} />,
};

function CategoriesGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}jobs/categories`);

        const data = await res.json();

        setCategories(data.categories || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            All Job Categories
          </h2>

          <p className="text-gray-500 mt-2">
            Explore thousands of opportunities across multiple industries.
          </p>
        </div>

        <Link
          to="/jobs"
          className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
        >
          Browse Jobs →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <CategoryCard
              key={category._id}
              title={category._id}
              jobs={`${category.count} Jobs`}
              icon={
                categoryIcons[category._id] || (
                  <FiBriefcase size={24} />
                )
              }
            />
          ))
        )}
      </div>
    </section>
  );
}

export default CategoriesGrid;