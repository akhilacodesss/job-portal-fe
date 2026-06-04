import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
 
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
  });
   const navigate = useNavigate();

  useEffect(() => {
    async function fetchStats() {
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
        const jobs = data.jobs || [];

        const totalJobs = jobs.length;

        const activeJobs = jobs.filter(
          (job) => job.status === "active"
        ).length;

        const totalApplications = jobs.reduce(
          (sum, job) =>
            sum + (job.applicationsCount || 0),
          0
        );

        setStats({
          totalJobs,
          activeJobs,
          totalApplications,
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchStats();
  }, [navigate]);

  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Recruiter Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Overview of your job postings.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Total Jobs
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Active Jobs
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.activeJobs}
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-gray-500">
              Applications
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.totalApplications}
            </p>
          </div>

        </div>


        <div className="flex gap-4 mt-8">

          <button
            onClick={() =>
              navigate("/add-job")}
            className="
      bg-indigo-600
      text-white
      px-6
      py-3
      rounded-xl
    "
          >
            Post Job
          </button>

          <button
            onClick={() =>
              navigate("/my-jobs")}
            className="
      border
      px-6
      py-3
      rounded-xl
    "
          >
            Manage Jobs
          </button>

        </div>
      </div>
    </section>
  );
}

export default RecruiterDashboard;