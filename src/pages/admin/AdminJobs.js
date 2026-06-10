import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/jobs`,
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
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id) {
    const confirmDelete = window.confirm(
      "Delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.REACT_APP_API_URL}/admin/jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Jobs...
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Manage Jobs
          </h1>

          <div className="bg-white rounded-2xl border overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Company
                  </th>

                  <th className="p-4 text-left">
                    Recruiter
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Posted
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-center text-slate-500"
                    >
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="border-t"
                    >
                      <td className="p-4 max-w-[220px] break-words">
                        {job.title}
                      </td>

                      <td className="p-4">
                        {job.company}
                      </td>

                      <td className="p-4 break-words">
                        {job.recruiter?.name || "Unknown"}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${job.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          job.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() =>
                            deleteJob(job._id)
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-3
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminJobs;