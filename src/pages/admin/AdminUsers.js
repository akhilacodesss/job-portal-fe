import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
       `${process.env.REACT_APP_API_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUsers(data.users || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.REACT_APP_API_URL}/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Users...
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Manage Users
          </h1>

          <div className="bg-white rounded-2xl border overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Role
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Joined
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t"
                    >
                      <td className="p-4 break-words">
                        {user.name}
                      </td>

                      <td className="p-4 break-all">
                        {user.email}
                      </td>

                      <td className="p-4">
                        {user.role.charAt(0).toUpperCase() +
                          user.role.slice(1)}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive
                            ? "Active"
                            : "Blocked"}
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4  whitespace-nowrap">
                        {user.role === "admin" ? (
                          <span className="text-gray-400">
                            Protected
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              deleteUser(user._id)
                            }
                            className="
                              bg-red-500
                              text-white
                              px-3
                              py-2
                              rounded-lg
                              hover:bg-red-600
                              transition
                            "
                          >
                            Delete
                          </button>
                        )}
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

export default AdminUsers;