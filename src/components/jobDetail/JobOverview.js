function JobOverview({ job }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6">
        Job Overview
      </h3>

      <div className="space-y-5">
        <div>
          <p className="text-gray-500 text-sm">
            Salary
          </p>
          <p className="font-medium">
  ₹{((job.salary?.min || 0) / 100000).toFixed(0)} LPA -
  ₹{((job.salary?.max || 0) / 100000).toFixed(0)} LPA
</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Experience
          </p>
          <p className="font-medium">
            {job.experience}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Job Type
          </p>
          <p className="font-medium">
            {job.jobType}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Location
          </p>
          <p className="font-medium">
            {job.location}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Category
          </p>
          <p className="font-medium">
            {job.category}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Date Posted
          </p>
          <p className="font-medium">
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        {job.deadline && (
          <div>
            <p className="text-gray-500 text-sm">
              Application Deadline
            </p>
            <p className="font-medium">
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <hr className="my-6" />

      <h4 className="font-semibold mb-3">
        Skills
      </h4>

      <div className="flex flex-wrap gap-2">
        {job.skills?.map((skill) => (
          <span
            key={skill}
            className="
              bg-slate-100
              px-3
              py-1
              rounded-md
              text-sm
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default JobOverview;