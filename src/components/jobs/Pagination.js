import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({
  page,
  setPage,
  totalPages,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
          w-10
          h-10
          border
          border-gray-200
          rounded-xl
          flex
          items-center
          justify-center
        "
      >
        <FiChevronLeft />
      </button>

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={
            item === page
              ? "w-10 h-10 bg-indigo-600 text-white rounded-xl"
              : "w-10 h-10 border border-gray-200 rounded-xl"
          }
        >
          {item}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="
          w-10
          h-10
          border
          border-gray-200
          rounded-xl
          flex
          items-center
          justify-center
        "
      >
        <FiChevronRight />
      </button>

    </div>
  );
}

export default Pagination;