import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyJobs() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
         `${process.env.REACT_APP_API_URL}/jobs/my-jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMyJobs();
  }, [navigate]);

  async function deleteJob(id) {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
       `${process.env.REACT_APP_API_URL}/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setMessage(data.message);

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );
    } catch {
      setMessage("Failed to delete job");
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Manage Your Jobs
            </h1>

            <p className="text-gray-500 mt-2">
              View, edit and manage your job postings.
            </p>
          </div>



        </div>

        {/* Message */}
        {message && (
          <div
            className="
              mb-6
              bg-green-50
              border
              border-green-200
              text-green-700
              px-4
              py-3
              rounded-xl
            "
          >
            {message}
          </div>
        )}

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div
            className="
              bg-white
              rounded-2xl
              border
              p-10
              text-center
            "
          >
            <h2 className="text-2xl font-semibold">
              No Jobs Posted Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first job posting.
            </p>

            <button
              onClick={() => navigate("/add-job")}
              className="
                mt-6
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (
              <div
                key={job._id}
                className="
                  bg-white
                  rounded-2xl
                  border
                  overflow-hidden
                  shadow-sm
                  hover:shadow-lg
                  transition
                "
              >

                {/* Logo */}
                <div className="h-48 bg-slate-100 flex items-center justify-center">
  <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center">
    <span className="text-indigo-600 font-bold text-3xl">
      {job.company?.charAt(0)}
    </span>
  </div>
</div>

                {/* Content */}
                <div className="p-5">

                  <h2 className="text-xl font-semibold line-clamp-1">
                    {job.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {job.company}
                  </p>

                  <div className="space-y-2 mt-4 text-sm text-gray-600">

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💼 {job.jobType}
                    </p>

                    <p>
                      ⏳ {job.experience}
                    </p>

                    ₹{((job.salary?.min || 0) / 100000).toFixed(0)} LPA -
                    ₹{((job.salary?.max || 0) / 100000).toFixed(0)} LPA

                    <p>
                      👥 {job.applicationsCount || 0} Applicants
                    </p>

                  </div>

                  <div className="mt-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {job.status.charAt(0).toUpperCase() +
                        job.status.slice(1)}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-3 gap-2 mt-6">

                    <button
                      onClick={() =>
                        navigate(`/edit-job/${job._id}`)
                      }
                      className="
      border
      border-gray-300
      py-3
      rounded-xl
      hover:border-indigo-600
      hover:text-indigo-600
      transition
    "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/applicants/${job._id}`)
                      }
                      className="
      border
      border-green-500
      text-green-600
      py-3
      rounded-xl
      hover:bg-green-500
      hover:text-white
      transition
    "
                    >
                      Applicants
                    </button>

                    <button
                      onClick={() =>
                        deleteJob(job._id)
                      }
                      className="
      border
      border-red-500
      text-red-500
      py-3
      rounded-xl
      hover:bg-red-500
      hover:text-white
      transition
    "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyJobs;