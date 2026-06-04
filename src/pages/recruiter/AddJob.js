import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "Full Time",
        experience: "Fresher",
        category: "",
        minSalary: "",
        maxSalary: "",
        skills: "",
        requirements: "",
        description: "",
        deadline: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-xl"
        >
            <option value="">Select Category</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Data Science</option>
            <option>Finance</option>
            <option>Human Resources</option>
            <option>Business</option>
            <option>Customer Support</option>
        </select>

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/jobs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        company: formData.company,
                        location: formData.location,
                        jobType: formData.jobType,
                        experience: formData.experience,
                        category: formData.category,
                        description: formData.description,
                        deadline: formData.deadline,

                        salary: {
                            min: Number(formData.minSalary),
                            max: Number(formData.maxSalary),
                        },

                        skills: formData.skills
                            .split(",")
                            .map((item) => item.trim()),

                        requirements: formData.requirements
                            .split(",")
                            .map((item) => item.trim()),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Failed to post job");
                return;
            }

            setMessage("Job posted successfully");

            setTimeout(() => {
                navigate("/my-jobs");
            }, 1200);

        } catch {
            setMessage("Something went wrong");
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="bg-white border rounded-2xl p-8">

                <h1 className="text-4xl font-bold text-gray-900">
                    Post a New Job
                </h1>

                <p className="text-gray-500 mt-2">
                    Create a new opportunity and attract top talent.
                </p>

                {message && (
                    <p className="mb-6 text-center text-indigo-600">
                        {message}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="title"
                            placeholder="Job Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        />

                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                        >
                            <option value="">Select Category</option>
                            <option>Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Data Science</option>
                            <option>Finance</option>
                            <option>Human Resources</option>
                            <option>Business</option>
                            <option>Customer Support</option>
                        </select>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                        >
                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                            <option>Remote</option>
                        </select>

                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                        >
                            <option>Fresher</option>
                            <option>1-3 years</option>
                            <option>3-5 years</option>
                            <option>5+ years</option>
                        </select>

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="number"
                            name="minSalary"
                            placeholder="Minimum Salary"
                            value={formData.minSalary}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        />

                        <input
                            type="number"
                            name="maxSalary"
                            placeholder="Maximum Salary"
                            value={formData.maxSalary}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        />

                    </div>

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (React, Node, MongoDB)"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="text"
                        name="requirements"
                        placeholder="Requirements (comma separated)"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <textarea
                        rows="6"
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                        required
                    />

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Application Deadline
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-xl"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="
    w-full
    bg-indigo-600
    hover:bg-indigo-700
    text-white
    py-4
    rounded-xl
    font-medium
    transition
  "
                    >
                        Post Job
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddJob;