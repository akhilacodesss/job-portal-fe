import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import JobTabs from "../components/jobDetail/JobTabs";
import SimilarJobs from "../components/jobDetail/SimilarJobs";
import JobOverview from "../components/jobDetail/JobOverview";
import CompanyInfo from "../components/jobDetail/CompanyInfo";
import ShareJob from "../components/jobDetail/ShareJob";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [similarJobs, setSimilarJobs] = useState([]);
  const [saved, setSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      const token = localStorage.getItem("token");

      if (!token || !job) return;

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

        const isSaved = data.savedJobs?.some(
          (item) => item.job?._id === job._id
        );

        setSaved(isSaved);
      } catch (err) {
        console.log(err);
      }
    }

    checkSaved();
  }, [job]);

  useEffect(() => {
    async function checkApplied() {
      const token = localStorage.getItem("token");

      if (!token || !job) return;

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

        const alreadyApplied =
          data.applications?.some(
            (application) =>
              application.job?._id === job._id
          );

        setHasApplied(alreadyApplied);
      } catch (err) {
        console.log(err);
      }
    }

    checkApplied();
  }, [job]);

  async function toggleSaveJob() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (saved) {
        await fetch(
          `${process.env.REACT_APP_API_URL}/saved-jobs/${job._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(false);
      } else {
        await fetch(
          `${process.env.REACT_APP_API_URL}/saved-jobs/${job._id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/jobs/${id}`
        );

        const data = await res.json();

        setJob(data.job);

        const jobsRes = await fetch(
          `${process.env.REACT_APP_API_URL}/jobs`
        );

        const jobsData = await jobsRes.json();

        const relatedJobs = jobsData.jobs
          ?.filter(
            (item) =>
              item._id !== data.job._id &&
              item.category === data.job.category
          )
          .slice(0, 4);

        setSimilarJobs(relatedJobs || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  async function applyJob() {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    if (hasApplied) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/applications/${job._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message || "Application failed"
        );

        if (
          data.message?.toLowerCase().includes("already")
        ) {
          setHasApplied(true);
        }

        return;
      }

      setHasApplied(true);

      setMessage(
        "Application submitted successfully"
      );
    } catch {
      setMessage("Application failed");
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Job not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span>›</span>
        <span>Jobs</span>
        <span>›</span>
        <span className="text-indigo-600 font-medium">
          {job.title}
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8">
        {/* LEFT */}
        <div>
          {/* HEADER CARD */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex flex-col sm:flex-row gap-6 flex-1 min-w-0">
                <div className="w-24 h-24 rounded-2xl border flex items-center justify-center shrink-0">
                 <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
  <span className="text-indigo-600 font-bold text-xl">
    {job.company?.charAt(0)}
  </span>
</div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                      New
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-4xl font-bold mt-2 break-words">
                    {job.title}
                  </h1>

                  <p className="text-lg text-gray-500 mt-2 break-words">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiMapPin />
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiBriefcase />
                      {job.jobType}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiClock />
                      {job.experience}
                    </span>

                    <span>
                      ₹
                      {(
                        (job.salary?.min || 0) /
                        100000
                      ).toFixed(0)}
                      LPA - ₹
                      {(
                        (job.salary?.max || 0) /
                        100000
                      ).toFixed(0)}
                      LPA
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {job.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-100 px-3 py-1 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {message && (
                  <p className="text-sm text-center text-green-600">
                    {message}
                  </p>
                )}

                {!user ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="
      bg-indigo-600
      hover:bg-indigo-700
      text-white
      px-10
      py-4
      rounded-xl
      font-medium
      transition
    "
                  >
                    Login to Apply
                  </button>
                ) : user.role === "jobseeker" ? (
                  <button
                    disabled={hasApplied}
                    onClick={applyJob}
                    className={`
      px-10
      py-4
      rounded-xl
      font-medium
      transition
      ${hasApplied
                        ? "bg-green-600 text-white cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }
    `}
                  >
                    {hasApplied ? "Applied ✓" : "Apply Now"}
                  </button>
                ) : null}

                <button
                  onClick={toggleSaveJob}
                  className="
    border
    rounded-xl
    py-4
    flex
    items-center
    justify-center
    gap-2
  "
                >
                  {saved ? (
                    <BsBookmarkFill className="text-indigo-600" />
                  ) : (
                    <BsBookmark />
                  )}

                  {saved ? "Saved" : "Save Job"}
                </button>

                <p className="text-sm text-gray-400 text-right">
                  {new Date(
                    job.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <JobTabs
            job={job}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SimilarJobs
            jobs={similarJobs}
            navigate={navigate}
          />
        </div>

        {/* SIDEBAR */}
        <aside>
          <JobOverview job={job} />

          <CompanyInfo job={job} />

          <ShareJob job={job} />
        </aside>
      </div>
    </div>
  );
}

export default JobDetail;