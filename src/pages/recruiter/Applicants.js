import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Applicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchApplicants() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setApplicants(data.applications || []);
      } catch {
        setMessage("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    }

    fetchApplicants();
  }, [jobId, navigate]);

  async function updateStatus(id, status) {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setApplicants((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status }
            : app
        )
      );
    } catch {
      setMessage("Failed to update status");
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading applicants...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Applicants
        </h1>

        <p className="text-gray-500 mb-8">
          Review candidates who applied for this job.
        </p>

        {message && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        {applicants.length === 0 ? (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Applicants Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Applications will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {applicants.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl border p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-6">

                  <div>
                    <h2 className="text-2xl font-semibold">
                      {application.applicant?.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {application.applicant?.email}
                    </p>

                    {application.applicant?.phone && (
                      <p className="mt-2">
                        📞 {application.applicant.phone}
                      </p>
                    )}

                    {application.applicant?.location && (
                      <p>
                        📍 {application.applicant.location}
                      </p>
                    )}

                    {application.applicant?.bio && (
                      <p className="mt-4 text-gray-600">
                        {application.applicant.bio}
                      </p>
                    )}

                    {application.applicant?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {application.applicant.skills.map(
                          (skill) => (
                            <span
                              key={skill}
                              className="bg-slate-100 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-center
                        text-sm
                        font-medium
                        ${
                          application.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : application.status === "shortlisted"
                            ? "bg-green-100 text-green-700"
                            : application.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>

                    {application.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(
                              application._id,
                              "shortlisted"
                            )
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded-xl"
                        >
                          Shortlist
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              application._id,
                              "rejected"
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-xl"
                        >
                          Reject
                        </button>
                      </>
                    )}

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

export default Applicants;