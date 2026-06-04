import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "",
        experience: "",
        category: "",
        minSalary: "",
        maxSalary: "",
        description: "",
    });

    useEffect(() => {
        async function fetchJob() {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/jobs/${id}`
                );

                const data = await res.json();

                const job = data.job;

                setFormData({
                    title: job.title || "",
                    company: job.company || "",
                    location: job.location || "",
                    jobType: job.jobType || "",
                    experience: job.experience || "",
                    category: job.category || "",
                    minSalary: job.salary?.min || "",
                    maxSalary: job.salary?.max || "",
                    description: job.description || "",
                });
            } catch {
                setMessage("Failed to load job");
            }
        }

        fetchJob();
    }, [id]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            Number(formData.minSalary) >
            Number(formData.maxSalary)
        ) {
            setMessage(
                "Minimum salary cannot exceed maximum salary"
            );
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/jobs/${id}`,
                {
                    method: "PUT",
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
                        salary: {
                            min: Number(formData.minSalary),
                            max: Number(formData.maxSalary),
                        },
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Update failed");
                return;
            }

            setMessage("Job updated successfully");

            setTimeout(() => {
                navigate("/my-jobs");
            }, 1000);

        } catch {
            setMessage("Something went wrong");
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="bg-white border rounded-2xl p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Edit Job
                </h1>

                <p className="text-gray-500 mb-8">
                    Update your job posting.
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
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Job Title"
                            className="border p-3 rounded-xl"
                            required
                        />

                        <input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company"
                            className="border p-3 rounded-xl"
                            required
                        />

                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="border p-3 rounded-xl"
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-3 rounded-xl"
                            required
                        >
                            <option>Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Data Science</option>
                            <option>Finance</option>
                            <option>Human Resources</option>
                            <option>Business</option>
                            <option>Customer Support</option>
                        </select>

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
                            name="minSalary"
                            value={formData.minSalary}
                            onChange={handleChange}
                            placeholder="Min Salary"
                            className="border p-3 rounded-xl"
                        />

                        <input
                            name="maxSalary"
                            value={formData.maxSalary}
                            onChange={handleChange}
                            placeholder="Max Salary"
                            className="border p-3 rounded-xl"
                        />

                    </div>

                    <textarea
                        rows="6"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border p-3 rounded-xl"
                    />

                    <button
                        type="submit"
                        className="
              w-full
              bg-indigo-600
              text-white
              py-3
              rounded-xl
              hover:bg-indigo-700
            "
                    >
                        Update Job
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditJob;