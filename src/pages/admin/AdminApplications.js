import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
         `${process.env.REACT_APP_API_URL}/admin/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setApplications(data.applications || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Applications...
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Applications
          </h1>

          <div className="bg-white rounded-2xl border overflow-x-auto">

            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">
                    Applicant
                  </th>

                  <th className="p-4 text-left">
                    Job
                  </th>

                  <th className="p-4 text-left">
                    Recruiter
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-6 text-center text-slate-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-t"
                    >
                      <td className="p-4 break-words">
                        {app.applicant?.name}
                      </td>

                      <td className="p-4 break-words max-w-[250px]">
                        {app.job?.title}
                      </td>

                      <td className="p-4 break-words">
                        {app.recruiter?.name}
                      </td>

                      <td className="p-4 whitespace-nowrap ">
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium
                            ${
                              app.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : app.status === "shortlisted"
                                ? "bg-green-100 text-green-700"
                                : app.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          {app.status?.charAt(0).toUpperCase() +
                            app.status?.slice(1)}
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          app.createdAt
                        ).toLocaleDateString()}
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

export default AdminApplications;