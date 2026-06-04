import { useEffect, useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    skills: "",
    bio: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setFormData({
        name: data.user?.name || "",
        phone: data.user?.phone || "",
        location: data.user?.location || "",
        skills: data.user?.skills?.join(", ") || "",
        bio: data.user?.bio || "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  setMessage("Enter a valid 10-digit Indian mobile number");
  return;
}

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            location: formData.location,
            bio: formData.bio,
            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to update profile");
        return;
      }

      setMessage("Profile updated successfully");
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white border rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          My Profile
        </h1>

        <p className="text-gray-500 mb-8">
          Complete your profile to improve job applications.
        </p>

        {message && (
          <div className="mb-6 p-3 rounded-xl bg-green-50 text-green-700 border border-green-200">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

         <div>
  <label className="block mb-2 font-medium">
    Phone Number
  </label>

  <div className="flex">
    <span className="border border-r-0 rounded-l-xl px-4 py-3 bg-gray-100">
      +91
    </span>

    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 10) {
          setFormData({
            ...formData,
            phone: value,
          });
        }
      }}
      placeholder="9876543210"
      className="w-full border rounded-r-xl p-3"
      maxLength={10}
    />
  </div>
</div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bio
            </label>

            <textarea
              rows="5"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell recruiters about yourself..."
              className="w-full border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Save Profile
          </button>

        </form>

      </div>
    </section>
  );
}

export default Profile;