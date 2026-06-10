import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setStats(data.stats);
      setRecentJobs(data.recentJobs || []);
      setRecentApps(data.recentApps || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="min-h-screen bg-slate-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10 flex items-start justify-between gap-4">
  <div>
    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
      Admin Dashboard
    </h1>

    <p className="text-slate-500 mt-2">
      Monitor platform activity and growth.
    </p>
  </div>

  <button
    className="md:hidden bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm shrink-0"
  >
    Manage ▼
  </button>
</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white rounded-2xl border p-6">
              <p className="text-slate-500 text-sm">
                Job Seekers
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats?.totalUsers || 0}
              </h2>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <p className="text-slate-500 text-sm">
                Recruiters
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats?.totalRecruiters || 0}
              </h2>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <p className="text-slate-500 text-sm">
                Jobs
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats?.totalJobs || 0}
              </h2>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <p className="text-slate-500 text-sm">
                Applications
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats?.totalApplications || 0}
              </h2>
            </div>

          </div>

          <div className="bg-white rounded-2xl border p-6 mb-8">

            <h2 className="text-2xl font-semibold mb-4">
              Recent Jobs
            </h2>

            {recentJobs.length === 0 ? (
              <p className="text-slate-500">
                No jobs found.
              </p>
            ) : (
              <div className="space-y-4">

                {recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {job.title}
                      </h3>

                      <p className="text-slate-500 text-sm">
                        {job.company}
                      </p>
                    </div>

                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
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
                ))}

              </div>
            )}

          </div>

          <div className="bg-white rounded-2xl border p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Recent Applications
            </h2>

            <div className="space-y-4">

              {recentApps.length === 0 ? (
                <p className="text-slate-500">
                  No applications found.
                </p>
              ) : (
                recentApps.map((app) => (
                  <div
                    key={app._id}
                    className="border-b pb-3"
                  >
                    <p className="font-medium">
                      {app.applicant?.name}
                    </p>

                    <p className="text-slate-500 text-sm">
                      Applied for {app.job?.title}
                    </p>
                  </div>
                ))
              )}

            </div>

          </div>

        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminDashboard;