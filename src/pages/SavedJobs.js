import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

useEffect(() => {
  async function fetchSavedJobs() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
       `${process.env.REACT_APP_API_URL}/saved-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setSavedJobs(data.savedJobs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  fetchSavedJobs();
}, [navigate]);

  async function removeSaved(jobId) {
    const token = localStorage.getItem("token");

    await fetch(
      `${process.env.REACT_APP_API_URL}/saved-jobs/${jobId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSavedJobs((prev) =>
      prev.filter((item) => item.job._id !== jobId)
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Saved Jobs
        </h1>

        {savedJobs.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            No saved jobs yet.
          </div>
        ) : (
          <div className="grid gap-5">

            {savedJobs.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-2xl p-6"
              >
                <h2 className="text-2xl font-semibold">
                  {item.job?.title}
                </h2>

                <p className="text-gray-500">
                  {item.job?.company}
                </p>

                <p className="mt-2">
                  📍 {item.job?.location}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      navigate(`/jobs/${item.job._id}`)
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                  >
                    View Job
                  </button>

                  <button
                    onClick={() =>
                      removeSaved(item.job._id)
                    }
                    className="border border-red-500 text-red-500 px-4 py-2 rounded-xl"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default SavedJobs;