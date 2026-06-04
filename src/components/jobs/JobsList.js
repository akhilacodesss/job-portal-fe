import JobCard from "./JobCard";

function JobsList({ jobs }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">
        {jobs.length} Jobs Found
      </h2>

      <p className="text-gray-500 mb-6">
        Explore opportunities from top companies worldwide.
      </p>

      <div className="space-y-5">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobsList;