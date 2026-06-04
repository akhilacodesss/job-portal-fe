function SimilarJobs({ jobs = [], navigate }) {
  if (!Array.isArray(jobs)) {
    return null;
  }

  return (
    <>
      {jobs.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Similar Jobs
            </h2>

            <button
              onClick={() => navigate("/jobs")}
              className="text-indigo-600 font-medium"
            >
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/jobs/${item._id}`)}
                className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition"
              >
               <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
  <span className="text-indigo-600 font-bold text-xl">
    {item.company?.charAt(0)}
  </span>
</div>
                <h3 className="font-semibold line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {item.company}
                </p>

                <p className="text-sm mt-3">
  ₹{((item.salary?.min || 0) / 100000).toFixed(0)} LPA -
  ₹{((item.salary?.max || 0) / 100000).toFixed(0)} LPA
</p>

                <p className="text-xs text-gray-400 mt-2">
                  {item.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SimilarJobs;