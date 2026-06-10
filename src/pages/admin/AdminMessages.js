import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setMessages(data.messages || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.REACT_APP_API_URL}/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function markAsRead(id) {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.REACT_APP_API_URL}/contact/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id
            ? { ...msg, isRead: true }
            : msg
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Messages...
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Contact Messages
          </h1>

          <div className="space-y-4">

            {messages.length === 0 ? (
              <div className="bg-white rounded-xl border p-6">
                No messages found.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-white border rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">
                          {message.name}
                        </h3>

                        <span
                          className={`px-2 py-1 text-xs rounded-full ${message.isRead
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {message.isRead
                            ? "Read"
                            : "Unread"}
                        </span>
                      </div>

                      <p className="text-slate-500 text-sm break-all">
                        {message.email}
                      </p>

                      <p className="mt-3 font-medium">
                        {message.subject}
                      </p>

                      <p className="text-slate-600 mt-2 break-words">
                        {message.message}
                      </p>

                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">

                      {!message.isRead && (
                        <button
                          onClick={() =>
                            markAsRead(message._id)
                          }
                          className="
  w-full md:w-auto
  bg-green-500
                            hover:bg-green-600
                            text-white
                            px-3
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteMessage(message._id)
                        }
                        className="
                        w-full md:w-auto
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

                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminMessages;