import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import { IoCashOutline } from "react-icons/io5";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(
  `${process.env.REACT_APP_API_URL}/jobs?limit=4`
);

        const data = await res.json();

        setJobs(data.jobs || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Discover handpicked opportunities from leading companies.
            </p>
          </div>

          <Link
            to="/jobs"
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
          >
            View All Jobs →
          </Link>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-gray-100
                  p-6
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 overflow-hidden">
  {job.companyLogo ? (
    <img
      src={job.companyLogo}
      alt={job.company}
      className="max-w-full max-h-full object-contain"
    />
  ) : (
    <span className="text-indigo-600 font-bold text-xl">
      {job.company?.charAt(0)}
    </span>
  )}
</div>

               <div className="min-h-[80px]">
  <h3 className="font-semibold text-xl text-gray-900">
    {job.title}
  </h3>

  <p className="text-gray-500 mt-1">
    {job.company}
  </p>
</div>

                <div className="mt-3">
                  <span className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full">
                    {job.jobType}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiMapPin />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiBriefcase />
                    <span>{job.experience}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IoCashOutline />
                    <span>
                      ₹{(job.salary?.min / 100000).toFixed(0)} LPA -
                      ₹{(job.salary?.max / 100000).toFixed(0)} LPA
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/jobs/${job._id}`)
                  }
                  className="
                    w-full
                    mt-6
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-3
                    rounded-xl
                    font-medium
                    transition
                  "
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedJobs;