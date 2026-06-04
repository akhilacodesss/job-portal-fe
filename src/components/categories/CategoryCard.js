import { Link } from "react-router-dom";

function CategoryCard({ icon, title, jobs }) {
  return (
    <Link to={`/jobs?category=${encodeURIComponent(title)}`}>
      <div
        className="
          bg-white
          border
          border-gray-100
          rounded-2xl
          p-6
          text-center
          hover:shadow-xl
          hover:-translate-y-2
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <div
          className="
            w-16
            h-16
            mx-auto
            rounded-full
            bg-indigo-50
            flex
            items-center
            justify-center
            text-indigo-600
            text-2xl
          "
        >
          {icon}
        </div>

        <h3 className="font-semibold mt-5 text-gray-900">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          {jobs}
        </p>
      </div>
    </Link>
  );
}

export default CategoryCard;