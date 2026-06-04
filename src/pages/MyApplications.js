import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

useEffect(() => {
  async function fetchApplications() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setApplications(data.applications || []);
    } catch {
      setMessage("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  fetchApplications();
}, [navigate]);

  async function withdrawApplication(id) {
    const token = localStorage.getItem("token");

    const confirmWithdraw = window.confirm(
      "Withdraw this application?"
    );

    if (!confirmWithdraw) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      setMessage("Application withdrawn");
    } catch {
      setMessage("Failed to withdraw application");
    }
  }

  function statusColor(status) {
    switch (status) {
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "hired":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading applications...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          My Applications
        </h1>

        <p className="text-gray-500 mb-8">
          Track all jobs you've applied to.
        </p>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start applying for jobs.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white border rounded-2xl p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                  <div>

                    <h2 className="text-2xl font-semibold">
                      {application.job?.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {application.job?.company}
                    </p>

                    <div className="space-y-2 mt-4 text-gray-600">

                      <p>
                        📍 {application.job?.location}
                      </p>

                      <p>
                        💼 {application.job?.jobType}
                      </p>

                      <p>
                        📅 Applied on{" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">

  <span
    className={`
      px-4
      py-2
      rounded-full
      text-sm
      font-medium
      ${statusColor(application.status)}
    `}
  >
    {application.status.charAt(0).toUpperCase() +
      application.status.slice(1)}
  </span>

  <div className="flex gap-3">

    <button
      onClick={() =>
        navigate(`/jobs/${application.job?._id}`)
      }
      className="
        bg-indigo-600
        text-white
        px-4
        py-2
        rounded-xl
        hover:bg-indigo-700
        transition
      "
    >
      View Job
    </button>

    {application.status === "pending" && (
      <button
        onClick={() =>
          withdrawApplication(application._id)
        }
        className="
          border
          border-red-500
          text-red-500
          px-4
          py-2
          rounded-xl
          hover:bg-red-500
          hover:text-white
          transition
        "
      >
        Withdraw
      </button>
    )}

  </div>

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

export default MyApplications;