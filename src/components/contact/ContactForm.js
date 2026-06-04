import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Failed to send message");
        return;
      }

      setStatus("Message sent successfully!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

    } catch {
      setStatus("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border">

      <h2 className="text-2xl font-bold mb-6">
        Send Us A Message
      </h2>

      {status && (
        <p
          className={`mb-4 text-sm ${
            status.includes("successfully")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          required
        />

        <textarea
          rows="6"
          placeholder="Write your message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            p-3
            resize-none
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-indigo-600
            text-white
            py-3
            rounded-xl
            hover:bg-indigo-700
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Sending..."
            : "Send Message"}
        </button>

      </form>

    </div>
  );
}

export default ContactForm;